<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import Form from "../../helpers/Form/Form.svelte";

  import { user } from "../../data/user.js";
  import {
    getUserFromLogin,
    addProject,
  } from "../../helpers/Functions/backend";
  import { onMount } from "svelte";

  let projects = [];
  let userData = {};
  user.subscribe((user) => {
    userData = user;
    projects = user.projects;
    console.log("Setting user");
  });

  onMount(async () => {
    if (!projects[0]) {
      user.set(await getUserFromLogin("Aidan.Tilgner", "password"));
    }
  });

  let newProjectModal = false;
  let projectData = {};
</script>

<Navbar />
<div class="projects" data-testid="projects">
  <Header
    title="Projects"
    type="subtitle"
    buttons={[
      {
        text: "New Project",
        type: "primary",
        action: () => (newProjectModal = true),
      },
    ]}
  />
  <PreviewGrid {projects} />
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
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .projects {
    @include default-padding;
  }
</style>
