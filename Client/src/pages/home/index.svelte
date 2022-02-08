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
  import MiniCard from "../../helpers/Informative/Cards/MiniCard.svelte";

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
      projects = await getUserProjects(userData.user_id);
      organizations = await getUserOrganizations(userData.user_id);
    } catch (err) {
      console.log("Error in onMount: ", err);
    }
  });

  let newProjectModal = false;

  let projectData = {};
</script>

<Navbar /><Modal
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
        addProject({
          owner: {
            user_id: userData.user_id,
            username: userData.username,
          },
          contributors: [
            { user_id: userData.user_id, username: userData.username },
          ],
          ...projectData,
        });
      },
    },
  ]}
>
  <Form
    data={{
      name: "",
      framework: "",
      description: "",
      externalLink: "",
    }}
    onChange={(e, inputs) => {
      projectData = inputs;
    }}
    prefilled={projectData}
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
        text: "Join Team",
        type: "secondary",
        action: "",
      },
      {
        text: "Create Team",
        type: "primary",
        action: "",
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
          newProjectModal = true;
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
