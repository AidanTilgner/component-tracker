<script>
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import NonDynamic from "../../../helpers/Form/NonDynamic.svelte";
  import MiniCard from "../../../helpers/Informative/Cards/MiniCard.svelte";
  import Footer from "../../../components/Footer/Footer.svelte";
  import AlertBanner from "../../../helpers/Informative/AlertBanner/AlertBanner.svelte";
  import UserSearch from "../../../components/UserSearch/UserSearch.svelte";
  import { goto, params } from "@roxi/routify";
  import {
    getOrganization,
    addProject,
    updateOrganization,
    deleteOrganization,
    getOrganizationJoinLink,
  } from "../../../helpers/Functions/backend.js";
  import { user } from "../../../data/user.js";
  import { onMount } from "svelte";
  import { verifyLoginStatus } from "../../../helpers/Functions/authentication";
  import {
    editableOrganizationSchema,
    newOrganizationProjectSchema,
  } from "../../../helpers/Functions/formSchemas.js";

  let userData = {};
  let organization = { projects: [], users: [] };
  user.subscribe((data) => {
    userData = data;
  });

  let alertBanner = {
    showing: false,
    message: "",
    type: "error",
  };

  onMount(async () => {
    const loggedIn = await verifyLoginStatus();
    if (!loggedIn) {
      $goto("/users/login");
    }
    const response = await getOrganization($params.organization);
    if (response.error) {
      alertBanner.showing = true;
      alertBanner.message = response.error;
      alertBanner.type = "error";
      return;
    }
    organization = response.organization;
  });

  let modal = false;
  let modalData = {};
  $: newProject = {
    organization: {
      organization_id: organization.organization_id,
      name: organization.name,
    },
  };

  let deleteModal = false;
  let userModal = false;
</script>

<Navbar />
<AlertBanner
  showing={alertBanner.showing}
  message={alertBanner.message}
  type={alertBanner.type}
/>
<Modal title={modalData.title} open={modal} buttons={modalData.buttons}>
  <NonDynamic fields={modalData.fields} onChange={modalData.action} />
</Modal>
<Modal
  open={deleteModal}
  title="Are you sure?"
  buttons={[
    {
      text: "No, go back",
      type: "secondary",
      action: () => {
        deleteModal = false;
      },
    },
    {
      text: "Yes, delete",
      type: "tertiary",
      action: async () => {
        const response = await deleteOrganization(organization.organization_id);
        if (response.error) {
          alertBanner.showing = true;
          alertBanner.message = response.error;
          alertBanner.type = "error";
          return;
        }
        deleteModal = false;
        $goto("/");
      },
    },
  ]}
>
  <p style="font-size:36px;">
    Are you sure you want to delete the organization "{organization.name}"
  </p>
</Modal>
<Modal
  open={userModal}
  buttons={[
    {
      text: "Cancel",
      type: "secondary",
      action: () => {
        userModal = false;
      },
    },
    {
      text: "Copy Link",
      type: "primary",
      action: async () => {
        const response = await getOrganizationJoinLink(
          organization.organization_id
        );
        if (response.error) {
          alertBanner.showing = true;
          alertBanner.message = response.error;
          alertBanner.type = "error";
          return;
        }
        userModal = false;
        alertBanner.showing = true;
        alertBanner.message = "Link copied to clipboard";
        alertBanner.type = "success";
        navigator.clipboard.writeText(response.code);
      },
    },
  ]}
  title="Add User"
>
  <p style="font-size: 24px;">Get a join code by clicking the button below</p>
</Modal>
<div class="organization">
  <Header
    title={organization.name}
    type="title"
    buttons={[
      {
        text: "Edit",
        type: "secondary",
        action: () => {
          modal = true;
          modalData = {
            title: "Edit Organization",
            fields: editableOrganizationSchema(organization),
            buttons: [
              {
                text: "Cancel",
                type: "secondary",
                action: () => {
                  modal = false;
                },
              },
              {
                text: "Submit",
                type: "primary",
                action: async () => {
                  if (!modalData.submittable) {
                    alertBanner.showing = true;
                    alertBanner.message = "Please fill out all required fields";
                    alertBanner.type = "error";
                    return;
                  }
                  const response = await updateOrganization(
                    organization.organization_id,
                    organization
                  );
                  if (response.error) {
                    alertBanner.showing = true;
                    alertBanner.message = response.error;
                    alertBanner.type = "error";
                    return;
                  }
                  alertBanner.showing = true;
                  alertBanner.message = response.message;
                  alertBanner.type = "success";
                  organization = response.organization;
                  modal = false;
                },
              },
            ],
            action: (e, inputs, submittable) => {
              modalData.submittable = submittable;
              organization.name = inputs.name;
            },
          };
        },
      },
      {
        text: "Delete",
        type: "tertiary",
        action: () => {
          deleteModal = true;
        },
      },
    ]}
  />
  <Header
    title="Projects"
    type="subtitle"
    buttons={[
      {
        text: "New Project",
        type: "primary",
        action: () => {
          modal = true;
          modalData = {
            title: "New Project",
            fields: newOrganizationProjectSchema(),
            buttons: [
              {
                text: "Cancel",
                type: "secondary",
                action: () => {
                  modal = false;
                },
              },
              {
                text: "Create",
                type: "primary",
                action: async () => {
                  console.log("Submitting project", newProject);
                  if (!modalData.submittable) {
                    alertBanner.showing = true;
                    alertBanner.message = "Please fill out all required fields";
                    alertBanner.type = "error";
                    return;
                  }
                  const response = await addProject(newProject);
                  if (response.error) {
                    alertBanner.showing = true;
                    alertBanner.message = response.error;
                    alertBanner.type = "error";
                    return;
                  }
                  alertBanner.showing = true;
                  alertBanner.message = response.message;
                  alertBanner.type = "success";
                  organization = {
                    ...organization,
                    projects: [...organization.projects, response.project],
                  };
                  modal = false;
                },
              },
            ],
            action: (e, inputs, submittable) => {
              console.log(inputs);
              modalData.submittable = submittable;
              newProject = {
                ...newProject,
                ...inputs,
              };
            },
          };
        },
      },
    ]}
  />
  {#if organization.projects[0] !== undefined}
    <PreviewGrid projects={organization.projects} />
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no projects, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          console.log("New User");
        }}>create a new one</span
      >?
    </p>
  {/if}
  <Header
    title="Users"
    type="subtitle"
    buttons={[
      {
        text: "New User",
        type: "primary",
        action: () => {
          userModal = true;
        },
      },
    ]}
  />
  {#if organization.users[0] !== undefined}
    <div class="organization__users">
      {#each organization.users as user}
        <div class="organization__user">
          <MiniCard
            title={user.username}
            subtitle={user.email}
            buttons={[
              {
                text: "Edit",
                type: "secondary",
                action: "",
              },
              {
                text: "Delete",
                type: "tertiary",
                action: "",
              },
            ]}
          />
        </div>
      {/each}
    </div>
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no members, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          console.log("New User");
        }}>add a new one</span
      >?
    </p>
  {/if}
</div>
<Footer />

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";
  .organization {
    @include default-padding;

    &__users {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__user {
      width: 48%;
      margin-bottom: 36px;
    }
  }
</style>
