<script>
  // Helpers
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import { getUserFromLogin } from "../helpers/Functions/backend.js";

  // Components
  import Navbar from "../components/Navbar/Navbar.svelte";
  import Header from "../helpers/Header/Header.svelte";
  import PreviewGrid from "../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../helpers/Modal/Modal.svelte";
  import Form from "../helpers/Form/Form.svelte";

  // Stores
  import { user } from "../data/user.js";

  // Getting user from API
  let projects = [];
  user.subscribe((user) => {
    console.log("User:", user);
    projects = user.projects;
  });

  onMount(async () => {
    const data = await getUserFromLogin("Aidan.Tilgner", "password");
    console.log("Data:", data);
    user.set(data);
    console.log(user);
  });

  // TODO: Add functionality for buttons

  let newProject = false;

  // We need to make a call to the server to get the user, and assign that
  // to the writable store. Then, using the id, we can make a call to get the
  // projects associated with the user.
  fetch("/api/user");
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
        action: () => (newProject = true),
      },
    ]}
  />
  {#if projects[0] !== undefined}
    <PreviewGrid {projects} />
  {/if}
  <Modal
    title="New Project"
    open={newProject}
    buttons={[
      { text: "Close", type: "secondary", action: () => (newProject = false) },
      { text: "Add", type: "primary", action: () => (newProject = false) },
    ]}
  >
    <Form
      data={{
        name: "",
        framework: "",
        description: "",
      }}
    />
  </Modal>
</div>

<style type="text/scss">
  @import "../styles/partials/variables.scss";
  @import "../styles/partials/typography.scss";
  @import "../styles/partials/mixins.scss";

  .home {
    @include default-padding;
  }
</style>
