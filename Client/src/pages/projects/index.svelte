<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import Form from "../../helpers/Form/Form.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";

  import { user } from "../../data/user.js";
  import {
    getUserFromLogin,
    addProject,
    getUserProjects,
  } from "../../helpers/Functions/backend";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication.js";
  import { onMount } from "svelte";
  import { goto } from "@roxi/routify";
  import Footer from "../../components/Footer/Footer.svelte";

  if (!verifyLoginStatus()) {
    $goto("/login");
  }

  let projects = [];
  let userData = {};
  user.subscribe((user) => {
    userData = user;
    projects = user.projects;
  });

  let newProjectModal = false;
  let projectData = {};
  let alertBanner = {
    showing: false,
    message: "",
    type: "",
    timeout: 3000,
  };
  let newProjectSubmittable = false;

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (!isLoggedIn) {
        $goto("/users/login");
      }
      console.log("User Data: ", userData);
      const response = await getUserProjects(userData.user_id);
      if (response.error) {
        console.log("Error: ", response.error);
        alertBanner.showing = true;
        alertBanner.message = response.error;
        alertBanner.type = "error";
        alertBanner.timeout = 3000;
        return;
      }
      projects !== response.projects && (projects = response.projects);
    } catch (error) {
      console.log("Error in onMount: ", error);
    }
  });
</script>

<Navbar />
<AlertBanner
  showing={alertBanner.showing}
  message={alertBanner.message}
  type={alertBanner.type}
  timeout={alertBanner.timeout}
/>
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
  {#if projects.length > 0}
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
        action: async () => {
          if (!newProjectSubmittable) {
            alertBanner.showing = true;
            alertBanner.message = "Please fill out all required fields";
            alertBanner.type = "error";
            return;
          }
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
          newProjectModal = false;
          const response = await addProject({
            owner: {
              user_id: userData.user_id,
              username: userData.username,
            },
            contributors: [
              { user_id: userData.user_id, username: userData.username },
            ],
            ...projectData,
          });
          if (response.error) {
            console.log("Error: ", response.error);
            alertBanner.showing = true;
            alertBanner.message = response.error;
            alertBanner.type = "error";
            return;
          }
          alertBanner.showing = true;
          alertBanner.message = "Project added successfully";
          alertBanner.type = "success";
          projects = await getUserProjects(userData.user_id);
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
              ...userData.organizations.map((org) => ({
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
        newProjectSubmittable = submitable;
        projectData = inputs;
      }}
    />
  </Modal>
</div>
<Footer />

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .projects {
    @include default-padding;
  }
</style>
