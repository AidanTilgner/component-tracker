<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import { user } from "../../data/user";
  import {
    logout,
    deleteUser,
    updateUser,
  } from "../../helpers/Functions/backend";
  import { writeToLocalStorage } from "../../helpers/Functions/local";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication";
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  let userData;
  user.subscribe((data) => {
    userData = data;
  });
  console.log("User:", userData);

  onMount(async () => {
    try {
      const loggedIn = await verifyLoginStatus();
      if (!loggedIn) {
        $goto("/users/login");
      }
    } catch (error) {
      console.log("Error in onMount:", error);
    }
  });

  let userUpdate = {};

  const submitUserUpdate = async () => {
    let newUser = await updateUser(userData.id, userUpdate);
    if (!newUser) {
      alert("Something went wrong");
      return;
    }
    user.set(newUser);
    console.log("User: ", userData);
    writeToLocalStorage("user", JSON.stringify(userData));
    alert("User Updated");
  };
</script>

<Navbar />
<div class="profile">
  <Header
    title="Profile"
    type="subtitle"
    buttons={[
      {
        text: "Logout",
        type: "secondary",
        action: (e) => {
          logout();
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
      console.log("Inputs: ", inputs);
      userUpdate = inputs;
    }}
  />
  {#if (userUpdate.username && userUpdate.username !== userData.username) || (userUpdate.email && userUpdate.email !== userData.email)}
    <button class="profile__submit" on:click={(e) => submitUserUpdate()}
      >Submit Changes</button
    >
  {/if}
</div>

<style type="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .profile {
    padding-inline-start: 100px;
    padding-inline-end: 100px;

    &__submit {
      @include button-text;
      margin-top: 36px;
    }
  }
</style>
