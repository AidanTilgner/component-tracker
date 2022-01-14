<script>
  // * Components
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import FileTree from "../../../components/FileTree/FileTree.svelte";
  import SideBar from "../../../components/SideBar/SideBar.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import Form from "../../../helpers/Form/Form.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem.svelte";

  // * Helpers
  import { params } from "@roxi/routify";
  import {
    formatKey,
    inferInfoItemTypeFromValueType,
  } from "../../../helpers/functions/formatting.js";
  import {
    getProject,
    getUserFromLogin,
  } from "../../../helpers/Functions/backend.js";
  import { onMount } from "svelte";

  // * State
  import { user } from "../../../data/user.js";

  let userData = {};
  user.subscribe((data) => {
    userData = data;
  });

  let project = {};

  onMount(async () => {
    project = await getProject($params.project);
    if (!userData.username) {
      user.set(await getUserFromLogin("Aidan.Tilgner", "password"));
    }
  });

  console.log("Project", project);

  let SideBarOpen = false;
  let ModalOpen = false;
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
      { text: "Add", type: "primary", action: () => (ModalOpen = true) },
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
      {#each Object.keys(project) as key}
        <InfoItem
          title={formatKey(key)}
          value={project[key]}
          type={inferInfoItemTypeFromValueType(project[key])}
        />
      {/each}
    </div>
    <div class="project-info__buttons">
      <button class="project-info__buttons__settings"> Settings </button>
      <button class="project-info__buttons__edit">Edit</button>
    </div>
  </SideBar>
  <Modal
    open={ModalOpen}
    title="New Component"
    buttons={[
      {
        text: "Close",
        type: "secondary",
        action: () => (ModalOpen = false),
      },
      { text: "Add", type: "primary", action: "" },
    ]}
  >
    <Form data={{ test1: [{ foo: "bar" }], test2: "" }} prefilled={true} />
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
    margin-bottom: 120px;

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
