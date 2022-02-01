<script>
  // Helpers
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import {
    getUserFromLogin,
    addProject,
  } from "../../helpers/Functions/backend.js";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication";

  // Components
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import Form from "../../helpers/Form/Form.svelte";

  // Stores
  import { user } from "../../data/user";

  verifyLoginStatus();

  // Getting user from API
  let userData = {};
  let projects = [];
  user.subscribe((user) => {
    userData = user;
    projects = user.projects;
  });

  onMount(async () => {
    user.set(await getUserFromLogin("Aidan.Tilgner", "password"));
  });

  // TODO: Add functionality for buttons

  let newProjectModal = false;

  let projectData = {};
</script>

<Navbar />
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
  {/if}
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
          addProject({
            owner: {
              id: userData.id,
              username: userData.username,
            },
            contributors: [{ id: userData.id, username: userData.username }],
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
        externalLinks: "",
      }}
      onChange={(e, inputs) => {
        projectData = inputs;
      }}
      prefilled={projectData}
    />
  </Modal>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .home {
    @include default-padding;
  }
</style>
