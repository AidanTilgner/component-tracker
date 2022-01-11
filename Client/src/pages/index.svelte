<script>
  // Helpers
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import axios from "axios";

  // Components
  import Navbar from "../components/Navbar/Navbar.svelte";
  import Header from "../helpers/Header/Header.svelte";
  import PreviewGrid from "../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../helpers/Modal/Modal.svelte";
  import Form from "../helpers/Form/Form.svelte";

  // Getting user from API
  onMount(async () => {
    let userID = "1284-wg32-214341-d134";
    axios
      .get(`http://localhost:8080/users/?id=1284-wg32-214341-d134`)
      .then((res) => {
        console.log(res);
      });
  });

  // TODO: Add functionality for buttons

  let newProject = false;

  let projects = [
    {
      title: "Onyx",
      edited: "Yesterday",
      framework: "react",
      endpoint: "h489-onyx",
    },
    {
      title: "Portfolio",
      edited: "Yesterday",
      framework: "svelte",
      endpoint: "1f4f-portfolio",
    },
    {
      title: "Soapbox",
      edited: "Yesterday",
      framework: "react",
      endpoint: "r5f3-soapbox",
    },
    {
      title: "Tracker",
      edited: "Yesterday",
      framework: "svelte",
      endpoint: "h489-component-tracker",
    },
  ];

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
  <PreviewGrid {projects} />
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
