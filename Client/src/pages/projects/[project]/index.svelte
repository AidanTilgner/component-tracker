<script>
  // * Components
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import FileTree from "../../../components/FileTree/FileTree.svelte";
  import SideBar from "../../../components/SideBar/SideBar.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import Form from "../../../helpers/Form/Form.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem/InfoItem.svelte";

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

  let userData = {};
  user.subscribe((data) => {
    userData = data;
  });

  let project = {};

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (!isLoggedIn) {
        $goto("/users/login");
      }
      project = (await getProject($params.project)).project;
    } catch (error) {
      console.log("Error in onMount: ", error);
    }
  });

  let SideBarOpen = false;
  let Modal1Open = false;
  let Modal2Open = false;
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
    owner: project.owner,
    name: project.name,
    framework: project.framework,
    description: project.description,
    externalLinks: project.externalLinks,
  };
</script>

<Navbar />
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
        action: () => {
          newComponent.creator = {
            id: userData.id,
            username: userData.username,
          };
          addComponent(project.id, newComponent);
          Modal1Open = false;
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
      },
    ]}
  >
    <Form
      data={{
        category: "",
        path: "",
        example: "",
        description: "",
        props: [
          {
            name: "",
            description: "",
            type: "",
          },
        ],
        state: [
          {
            name: "",
            description: "",
            type: "",
          },
        ],
        tags: [{ name: "", type: "" }],
      }}
      onChange={(e, data) => {
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
        action: () => {
          Modal2Open = false;
          updateProject(project.id, editableProject);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
      },
    ]}
  >
    <Form
      data={editableProject}
      onChange={(e, data) => {
        editableProject = data;
      }}
    />
  </Modal>
</div>

<style type="text/scss">
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
