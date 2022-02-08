<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import MiniCard from "../../helpers/Informative/Cards/MiniCard.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import { user } from "../../data/user.js";
  import { onMount } from "svelte";
  import {
    getUserOrganizations,
    addOrganization,
  } from "../../helpers/Functions/backend.js";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication.js";
  import { goto } from "@roxi/routify";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";

  let userData = {};
  let organizations = [];
  user.subscribe((data) => {
    userData = data;
  });

  onMount(async () => {
    const loggedIn = await verifyLoginStatus();
    if (!loggedIn) {
      $goto("/users/login");
    }
    organizations = await getUserOrganizations(userData.user_id);
    console.log(organizations);
  });

  let newOrganizationModal = true;
  let newOrganization = {
    owner: { user_id: userData.user_id, username: userData.username },
    users: [{ user_id: userData.user_id, username: userData.username }],
  };
</script>

<Navbar />
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
        const response = await addOrganization(newOrganization);
        if (response.status === 200) {
          newOrganizationModal = false;
          organizations = [...organizations, response.data];
        }
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

<div class="organizations">
  <Header
    title="Organizations"
    type="subtitle"
    buttons={[
      {
        text: "Add",
        type: "primary",
        action: () => {
          console.log("Add Organization");
          newOrganizationModal = true;
        },
      },
    ]}
  />
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
</div>

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
