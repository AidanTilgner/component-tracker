<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";
  import UserSearch from "../../components/UserSearch/UserSearch.svelte";
  import Sections from "../../helpers/Sections/Sections.svelte";
  import MiniCard from "../../helpers/Informative/Cards/MiniCard.svelte";
  import { user } from "../../data/user";
  import {
    logout,
    deleteUser,
    updateUser,
    getUser,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
  } from "../../helpers/Functions/backend";
  import { writeToLocalStorage } from "../../helpers/Functions/local";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication";
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import Footer from "../../components/Footer/Footer.svelte";
  import Icon from "../../helpers/Icon/Icon.svelte";
  let userData;
  user.subscribe((data) => {
    userData = data;
  });

  let alertBanner = {
    message: "",
    type: "",
    showing: false,
    timeout: 5000,
  };

  onMount(async () => {
    try {
      const loggedIn = await verifyLoginStatus();
      if (!loggedIn) {
        $goto("/users/login");
      }
      const response = await getUser(userData.user_id);
      if (response.error) {
        alertBanner.showing = true;
        alertBanner.message = response.error;
        alertBanner.type = "error";
      }
      user.set(response.user);
      console.log("user", userData);
    } catch (error) {
      console.log("Error in onMount:", error);
    }
  });

  let userUpdate = {};

  const showAlertBanner = (message, type) => {
    alertBanner.message = message;
    alertBanner.type = type;
    alertBanner.showing = true;
  };

  const submitUserUpdate = async () => {
    let newUserResponse = await updateUser(userData.user_id, userUpdate);
    if (newUserResponse.error) {
      showAlertBanner(newUserResponse.error, "error");
      return;
    }
    user.set(newUserResponse.user);
    writeToLocalStorage("user", JSON.stringify(userData));
    showAlertBanner(newUserResponse.message, "success");
  };

  let friendsSections = [
    { name: "Your Friends", open: true },
    { name: "Pending", open: false },
    { name: "Requests", open: false },
  ];
</script>

<Navbar />
<AlertBanner
  message={alertBanner.message}
  type={alertBanner.type}
  showing={alertBanner.showing}
  timeout={alertBanner.timeout}
/>
<div class="profile">
  <div class="profile__user">
    <Header
      title="Profile"
      type="subtitle"
      buttons={[
        {
          text: "Logout",
          type: "secondary",
          action: async (e) => {
            const logoutData = await logout();
            console.log("Logout:", logoutData);
            $goto("/users/login");
          },
        },
        {
          text: "Delete User",
          type: "tertiary",
          action: (e) => {
            deleteUser(userData.id);
            logout();
            $goto("/users/login");
          },
        },
      ]}
    />
    <NonDynamic
      fields={[
        {
          name: "Username",
          value: userData.username,
          required: true,
          type: "text",
        },
        {
          name: "Email",
          value: userData.email,
          required: true,
          type: "text",
        },
      ]}
      onChange={(e, inputs) => {
        userUpdate = inputs;
      }}
    />
    {#if (userUpdate.username && userUpdate.username !== userData.username) || (userUpdate.email && userUpdate.email !== userData.email)}
      <button class="profile__submit" on:click={(e) => submitUserUpdate()}
        >Submit Changes</button
      >
    {/if}
  </div>

  <div class="profile__friends" id="friends">
    <Header title="Friends" type="subtitle" buttons={[]} />
    <Sections
      sections={[
        {
          name: "Your Friends",
        },
        {
          name: "Pending",
        },
        {
          name: "Requests",
        },
      ]}
      action={(e, selected) => {
        console.log("selected:", selected);
        friendsSections = friendsSections.map((s) => {
          s.open = false;
          return s;
        });
        friendsSections.find((s) => s.name === selected.name).open = true;
        console.log("Friends Sections:", friendsSections);
      }}
    />
    {#if friendsSections[0].open}
      {#if userData.friends?.length > 0}
        {#each userData.friends as friend}
          <MiniCard
            title={friend.username}
            subtitle={friend.email}
            action={(e) => {
              console.log("Friend:", friend);
            }}
          />
        {/each}
      {/if}
    {/if}
    {#if friendsSections[1].open}
      <UserSearch
        promptText="Add Friend"
        users={userData.friends}
        action={async (user) => {
          console.log("User:", user);
          const response = await sendFriendRequest(
            userData.user_id,
            user.user_id
          );
          if (response.error) {
            alertBanner.showing = true;
            alertBanner.message = response.error;
            alertBanner.type = "error";
          }
          console.log("Response:", response);
          alertBanner.showing = true;
          alertBanner.message = response.message;
          alertBanner.type = "success";
        }}
      />
      {#if userData.friend_requests?.sent.length > 0}
        {#each userData.friend_requests.sent as pending}
          <div class="profile__pending">
            <p class="profile__pending__name">{pending.username}</p>
          </div>
        {/each}
      {/if}
    {/if}
    {#if friendsSections[2].open}
      {#if userData.friend_requests?.received.length > 0}
        {#each userData.friend_requests.received as received}
          <div class="profile__recieved">
            <p class="profile__recieved__name">{received.username}</p>
            <div class="profile__recieved__icons">
              <div
                class="profile__recieved__reject"
                on:click={async () => {
                  console.log("Reject:", received);
                  const response = await rejectFriendRequest(
                    userData.user_id,
                    received.user_id
                  );
                  if (response.error) {
                    alertBanner.showing = true;
                    alertBanner.message = response.error;
                    alertBanner.type = "error";
                  }
                  alertBanner.showing = true;
                  alertBanner.message = response.message;
                  alertBanner.type = "success";
                }}
              >
                <Icon
                  name="close"
                  width="24px"
                  height="24px"
                  color={"#a64128"}
                />
              </div>
              <div
                class="profile__recieved__check"
                on:click={async () => {
                  console.log("Reject:", received);
                  const response = await acceptFriendRequest(
                    userData.user_id,
                    received.user_id
                  );
                  if (response.error) {
                    alertBanner.showing = true;
                    alertBanner.message = response.error;
                    alertBanner.type = "error";
                  }
                  alertBanner.showing = true;
                  alertBanner.message = response.message;
                  alertBanner.type = "success";
                }}
              >
                <Icon name="check" width="24px" height="24px" />
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {/if}
  </div>
</div>
<Footer />

<style type="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .profile {
    padding-inline-start: 100px;
    padding-inline-end: 100px;
    font-family: $font-primary;

    &__submit {
      @include button-text;
      margin-top: 36px;
    }

    &__user {
    }

    &__friends {
      margin-bottom: 150px;
    }

    &__recieved {
      margin-top: 36px;
      margin-bottom: 36px;
      width: 250px;
      height: 56px;
      box-shadow: 2px 2px 6px 0 rgba($color: #000000, $alpha: 0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      border-radius: 5px;

      &__name {
        font-weight: 500;
        font-size: 16px;
      }

      &__icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 56px;
      }

      &__reject {
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          cursor: pointer;
          background-color: #e2e2e2;
          border-radius: 50%;
        }
      }

      &__check {
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          cursor: pointer;
          background-color: #e2e2e2;
          border-radius: 50%;
        }
      }
    }

    &__pending {
      margin-top: 36px;
      margin-bottom: 36px;
      width: 250px;
      height: 56px;
      box-shadow: 2px 2px 6px 0 rgba($color: #000000, $alpha: 0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      border-radius: 5px;

      &__name {
        font-weight: 500;
        font-size: 16px;
      }
    }
  }
</style>
