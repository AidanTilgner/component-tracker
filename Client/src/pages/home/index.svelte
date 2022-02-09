<script>
  // Helpers
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import {
    getUserFromLogin,
    addProject,
    getUserProjects,
    getUserOrganizations,
  } from "../../helpers/Functions/backend.js";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication";

  // Components
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import Form from "../../helpers/Form/Form.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import MiniCard from "../../helpers/Informative/Cards/MiniCard.svelte";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";

  // Stores
  import { user } from "../../data/user";

  // Getting user from API
  let userData = {};
  let projects = [];
  let organizations = [];
  user.subscribe((user) => {
    console.log("User: ", user);
    userData = user;
  });

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (!isLoggedIn) {
        console.log("Redirecting to login");
        $goto("/users/login");
      }
      projects = (await getUserProjects(userData.user_id)).projects;
      organizations = (await getUserOrganizations(userData.user_id))
        .organizations;
    } catch (err) {
      console.log("Error in onMount: ", err);
    }
  });

  let newProjectModal = false;

  let projectData = {};

  let alertBanner = {
    showing: false,
    message: "",
    type: "",
    timeout: 3000,
  };
</script>

<Navbar />
<AlertBanner
  showing={alertBanner.showing}
  message={alertBanner.message}
  type={alertBanner.type}
  timeout={alertBanner.timeout}
/>
<Modal
  title="New Project"
  open={newProjectModal}
  buttons={[
    {
      text: "Close",
      type: "secondary",
      action: () => (newProjectModal = false),
    },
    {
      text: "Add",
      type: "primary",
      action: () => {
        newProjectModal = false;
        console.log("Project data: ", {
          owner: {
            user_id: userData.user_id,
            username: userData.username,
          },
          contributors: [
            { user_id: userData.user_id, username: userData.username },
          ],
          ...projectData,
        });
        // addProject({
        //   owner: {
        //     user_id: userData.user_id,
        //     username: userData.username,
        //   },
        //   contributors: [
        //     { user_id: userData.user_id, username: userData.username },
        //   ],
        //   ...projectData,
        // });
      },
    },
  ]}
>
  <NonDynamic
    fields={[
      {
        name: "name",
        value: "",
        type: "text",
        required: true,
      },
      {
        name: "description",
        value: "",
        type: "text",
        required: true,
      },
      {
        name: "framework",
        value: "",
        settings: {
          options: [
            {
              value: "svelte",
              label: "Svelte",
            },
            {
              value: "react",
              label: "React",
            },
            {
              value: "vue",
              label: "Vue",
            },
            {
              value: "angular",
              label: "Angular",
            },
            {
              value: "",
              label: "Other",
            },
          ],
        },
        type: "select",
        required: false,
      },
      {
        name: "Organization",
        value: "",
        settings: {
          options: [
            { value: "", label: "none" },
            ...organizations.map((org) => ({
              value: org.organization_id,
              label: org.name,
            })),
          ],
        },
        type: "select",
        required: false,
      },
    ]}
    onChange={(e, inputs, submitable) => {
      console.log("Inputs: ", inputs);
      if (!submitable) {
        alertBanner.showing = true;
        alertBanner.message = "Please fill out all required fields";
        alertBanner.type = "error";
        alertBanner.timeout = 3000;
        return;
      }
      projectData = inputs;
    }}
  />
</Modal>
<div class="home" data-testid="home">
  <Header
    title="Recent Projects"
    type="subtitle"
    buttons={[
      {
        text: "All Projects",
        type: "secondary",
        action: () => $goto("/projects"),
      },
      {
        text: "New Project",
        type: "primary",
        action: () => (newProjectModal = true),
      },
    ]}
  />
  {#if projects[0] !== undefined}
    <PreviewGrid {projects} />
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no projects, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          newProjectModal = true;
        }}>create a new one</span
      >?
    </p>
  {/if}
  <Header
    title="Teams"
    type="subtitle"
    buttons={[
      {
        text: "All Teams",
        type: "secondary",
        action: () => {
          $goto("/organizations");
        },
      },
    ]}
  />
  {#if organizations[0] !== undefined}
    <div class="organizations">
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
          $goto("/organizations");
        }}>create a new one</span
      >?
    </p>
  {/if}
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .home {
    @include default-padding;
  }

  .organizations {
    &__item {
      margin-bottom: 36px;
      width: 48%;
    }
  }
</style>
