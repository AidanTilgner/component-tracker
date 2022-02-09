<script>
  // * Components
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import FileTree from "../../../components/FileTree/FileTree.svelte";
  import SideBar from "../../../components/SideBar/SideBar.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import Form from "../../../helpers/Form/Form.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem/InfoItem.svelte";
  import AlertBanner from "../../../helpers/Informative/AlertBanner/AlertBanner.svelte";
  import NonDynamic from "../../../helpers/Form/NonDynamic.svelte";
  import Footer from "../../../components/Footer/Footer.svelte";

  // * Helpers
  import { goto, params } from "@roxi/routify";
  import { inferInfoItemTypeFromValueType } from "../../../helpers/functions/inference.js";
  import { formatKey } from "../../../helpers/functions/formatting.js";
  import {
    getProject,
    getUserFromLogin,
    addComponent,
    updateProject,
  } from "../../../helpers/Functions/backend.js";
  import { verifyLoginStatus } from "../../../helpers/Functions/authentication.js";
  import { onMount } from "svelte";

  // * State
  import { user } from "../../../data/user.js";
  import {
    editableProjectSchema,
    newComponentSchema,
  } from "../../../helpers/Functions/formSchemas.js";

  let userData = {};
  user.subscribe((data) => {
    userData = data;
  });

  let project = {};

  let alertBanner = {
    showing: false,
    message: "",
    type: "",
    timeout: 5000,
  };

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (!isLoggedIn) {
        $goto("/users/login");
      }
      const response = await getProject($params.project);
      if (response.error) {
        alertBanner.showing = true;
        alertBanner.message = response.error;
        alertBanner.type = "error";
        return;
      }
      project = response.project;
    } catch (error) {
      console.log("Error in onMount: ", error);
    }
  });

  let SideBarOpen = false;
  let Modal1Open = false;
  let Modal2Open = true;
  let newComponent = {
    metaData: {
      category: "",
      path: "",
      example: "",
      description: "",
      props: [{ name: "", type: "", description: "" }],
      state: [{ name: "", type: "", description: "" }],
      tags: [{ name: "", type: "" }],
    },
  };
  $: editableProject = {
    name: project.name,
    description: project.description,
    framework: project.framework,
  };
  let componentSubmittable = false;
  let projectSubmittable = false;
</script>

<!-- Extra Stuff -->
<Navbar />
<AlertBanner
  showing={alertBanner.showing}
  message={alertBanner.message}
  type={alertBanner.type}
  timeout={alertBanner.timeout}
/>
<Modal
  open={Modal1Open}
  title="New Component"
  buttons={[
    {
      text: "Close",
      type: "secondary",
      action: () => (Modal1Open = false),
    },
    {
      text: "Add",
      type: "primary",
      action: async () => {
        if (!componentSubmittable) {
          alertBanner.showing = true;
          alertBanner.message = "Please fill out all required fields";
          alertBanner.type = "error";
          return;
        }
        newComponent.creator = {
          id: userData.user_id,
          username: userData.username,
        };
        Modal1Open = false;
        const response = await addComponent(project.project_id, newComponent);
        if (response.error) {
          alertBanner.showing = true;
          alertBanner.message = response.error;
          alertBanner.type = "error";
          return;
        }
        alertBanner.showing = true;
        alertBanner.message = response.message;
        alertBanner.type = "success";
        project = response.project;
      },
    },
  ]}
>
  <NonDynamic
    fields={newComponentSchema}
    onChange={(e, data, submittable) => {
      newComponent.metaData = { ...newComponent.metaData, ...data };
    }}
  />
</Modal>
<Modal
  open={Modal2Open}
  title="Edit Project"
  buttons={[
    {
      text: "Close",
      type: "secondary",
      action: () => (Modal2Open = false),
    },
    {
      text: "Submit",
      type: "primary",
      action: async () => {
        if (!projectSubmittable) {
          alertBanner.showing = true;
          alertBanner.message = "Please fill out all required fields";
          alertBanner.type = "error";
          return;
        }
        Modal2Open = false;
        const response = await updateProject(
          project.project_id,
          editableProject
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
        project = response.project;
      },
    },
  ]}
>
  <NonDynamic
    fields={editableProjectSchema(project)}
    onChange={(e, data, submittable) => {
      projectSubmittable = submittable;
      console.log("data: ", data);
      editableProject = data;
    }}
  />
</Modal>
<SideBar open={SideBarOpen} close={() => (SideBarOpen = false)}>
  <Header title="Project Information" type="subtitle" />
  <div class="project-info">
    {#each Object.keys(project).filter((key) => key !== "components") as key}
      <div class="project-info__section">
        <InfoItem title={formatKey(key)} value={project[key]} />
      </div>
    {/each}
  </div>
  <div class="project-info__buttons">
    <button class="project-info__buttons__settings"> Settings </button>
    <button
      class="project-info__buttons__edit"
      on:click={(e) => {
        Modal2Open = true;
      }}>Edit</button
    >
  </div>
</SideBar>

<!-- Page -->
<div class="project" data-testid="project">
  <Header
    title={`
      <a href="/projects" style="color:#2256f2;text-decoration:none;">
        ${userData.username}
      </a>/
      <span style='font-weight:bold;'>
        ${project.name}
      </span>
    `}
    type="breadcrumbs"
    buttons={[
      { text: "Add", type: "primary", action: () => (Modal1Open = true) },
      {
        text: "Project Info",
        type: "slide-left",
        action: () => (SideBarOpen = true),
      },
    ]}
  />
  {#if project.components}
    <Header title="Tree" type="subtitle" />
    <FileTree {project} />
  {/if}
  <FileTree {project} />
</div>
<Footer />

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";
  .project {
    @include default-padding;
  }

  .project-info {
    font-family: $font-primary;
    margin-bottom: 200px;

    &__section {
      font-size: 24px;
      margin-bottom: 36px;

      &__title {
        font-weight: 500;
      }
    }

    &__buttons {
      padding-inline-start: 36px;
      padding-inline-end: 36px;
      position: fixed;
      bottom: 0;
      right: 0;
      left: 50vw;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 36px;
      background-color: white;

      &__settings {
        @include button-text;
      }

      &__edit {
        @include button;
        @include button-primary;
      }
    }
  }
</style>
