<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import MiniCard from "../../helpers/Informative/Cards/MiniCard.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import Input from "../../helpers/Input/Input.svelte";
  import { user } from "../../data/user.js";
  import { onMount } from "svelte";
  import {
    getUserOrganizations,
    addOrganization,
    joinOrganization,
  } from "../../helpers/Functions/backend.js";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication.js";
  import { goto } from "@roxi/routify";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";
  import Footer from "../../components/Footer/Footer.svelte";

  let userData = {};
  let organizations = [];
  user.subscribe((data) => {
    userData = data;
  });

  let alertBanner = {
    message: "",
    type: "",
    showing: false,
  };

  onMount(async () => {
    const loggedIn = await verifyLoginStatus();
    if (!loggedIn) {
      $goto("/users/login");
    }
    organizations = (await getUserOrganizations(userData.user_id))
      .organizations;
    user.update((data) => {
      data.organizations = organizations;
      return data;
    });
  });

  let newOrganizationModal = false;
  let newOrganization = {
    owner: { user_id: userData.user_id, username: userData.username },
    users: [{ user_id: userData.user_id, username: userData.username }],
  };
  let joinModal = false;
  let joinLink = "";
</script>

<Navbar />
<AlertBanner
  message={alertBanner.message}
  type={alertBanner.type}
  showing={alertBanner.showing}
/>
<Modal
  title="New Organization"
  open={newOrganizationModal}
  buttons={[
    {
      text: "Cancel",
      type: "secondary",
      action: () => {
        newOrganizationModal = false;
      },
    },
    {
      text: "Submit",
      type: "primary",
      action: async () => {
        if (!newOrganization.name || !newOrganization.name === "") {
          alertBanner.message = "Please enter a name for your organization.";
          alertBanner.type = "error";
          alertBanner.showing = true;
          return;
        }
        const response = await addOrganization(newOrganization);
        if (response.error) {
          alertBanner.message = response.error;
          alertBanner.type = "error";
          alertBanner.showing = true;
          return;
        }
        alertBanner.message = "Organization created successfully";
        alertBanner.type = "success";
        alertBanner.showing = true;
        newOrganizationModal = false;
        organizations = (await getUserOrganizations(userData.user_id))
          .organizations;
        user.update((data) => {
          data.organizations = organizations;
        });
      },
    },
  ]}
>
  <NonDynamic
    fields={[
      {
        name: "Name",
        type: "text",
        value: "",
        required: true,
      },
    ]}
    onChange={(e, data) => {
      newOrganization.name = data.name;
    }}
  />
</Modal>
<Modal
  open={joinModal}
  title="Join Organization"
  buttons={[
    {
      text: "Cancel",
      type: "secondary",
      action: () => {
        joinModal = false;
      },
    },
    {
      text: "Join",
      type: "primary",
      action: async () => {
        console.log("Joining organization");
        const response = await joinOrganization(userData.user_id, joinLink);
        if (response.error) {
          alertBanner.message = response.error;
          alertBanner.type = "error";
          alertBanner.showing = true;
          return;
        }
        alertBanner.message = "Joined organization successfully";
        alertBanner.type = "success";
        alertBanner.showing = true;
        joinModal = false;
      },
    },
  ]}
>
  <Input
    type="text"
    field={{
      name: "Join Link",
      value: joinLink,
    }}
    onChange={(e, input) => {
      joinLink = input;
    }}
  />
</Modal>

<div class="organizations">
  <Header
    title="Organizations"
    type="subtitle"
    buttons={[
      {
        text: "Join",
        type: "secondary",
        action: () => {
          joinModal = true;
        },
      },
      {
        text: "Add",
        type: "primary",
        action: () => {
          newOrganizationModal = true;
        },
      },
    ]}
  />
  {#if organizations.length > 0}
    <div class="organizations__list">
      {#each organizations as organization}
        <div class="organizations__item">
          <MiniCard
            title={organization.name}
            endpoint={`/organizations/${organization.organization_id}`}
          />
        </div>
      {/each}
    </div>
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no teams, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          newOrganizationModal = true;
        }}>create a new one</span
      >?
    </p>
  {/if}
</div>
<Footer />

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";
  .organizations {
    @include default-padding;
    background-color: #f8f8f8;

    &__list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__item {
      margin-bottom: 36px;
      width: 48%;
    }
  }
</style>
