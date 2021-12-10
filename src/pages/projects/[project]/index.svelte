<script>
  import { params } from "@roxi/routify";
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import FileTree from "../../../components/FileTree/FileTree.svelte";
  import SideBar from "../../../components/SideBar/SideBar.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import Form from "../../../helpers/Form/Form.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem.svelte";
  import {
    formatKey,
    inferInfoItemTypeFromValueType,
  } from "../../../helpers/functions/formatting.js";
  let project = {
    name: "project",
    codeName: $params.project,
    framework: "React",
  };

  let SideBarOpen = false;
  let ModalOpen = false;
</script>

<Navbar />
<div class="project" data-testid="project">
  <Header
    title="Aidan Tilgner/{project.name}"
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
  <Header title="Tree" type="subtitle" />
  <FileTree />
  <SideBar open={SideBarOpen} close={() => (SideBarOpen = false)}>
    <Header title="Project Information" type="subtitle" />
    {#each Object.keys(project) as key}
      <InfoItem
        title={formatKey(key)}
        value={project[key]}
        type={inferInfoItemTypeFromValueType(project[key])}
      />
    {/each}
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
    <Form
      data={{
        name: "",
        fileType: "",
        category: "",
        path: "",
        example: "",
        description: "",
        props: [],
        state: [],
        tags: [],
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
