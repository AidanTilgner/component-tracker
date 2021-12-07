<script>
  import { params } from "@roxi/routify";
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import FileTree from "../../../components/FileTree/FileTree.svelte";
  import SideBar from "../../../components/SideBar/SideBar.svelte";
  import Modal from "../../../Helpers/Modal/Modal.svelte";
  import Form from "../../../Helpers/Form/Form.svelte";
  console.log($params);
  let project = {
    name: "project",
    codeName: $params.project,
    framework: "React",
  };

  let SideBarOpen = false;
  let toggleSideBar = (to) => {
    console.log("toggling");
    if (to === undefined) {
      SideBarOpen = !SideBarOpen;
    } else {
      SideBarOpen = to;
    }
  };

  let ModalOpen = true;
  let toggleModal = (to) => {
    console.log("toggling");
    if (to === undefined) {
      ModalOpen = !ModalOpen;
    } else {
      ModalOpen = to;
    }
  };
</script>

<Navbar />
<div class="project">
  <Header
    title="Aidan Tilgner/<span style='font-weight: bold;'>{project.name}</span>"
    type="breadcrumbs"
    buttons={[
      { text: "Add", type: "primary", action: () => toggleModal(true) },
      {
        text: "Project Info",
        type: "slide-left",
        action: () => toggleSideBar(true),
      },
    ]}
  />
  <Header title="Tree" type="subtitle" />
  <FileTree />
  <SideBar open={SideBarOpen} close={() => toggleSideBar(false)}>
    <Header title="Project Information" type="subtitle" />
    <div class="project-info">
      <div class="project-info__section">
        <div class="project-info__section__title">Description:</div>
      </div>
      <div class="project-info__section">
        <div class="project-info__section__title">
          Framework: <span style="color: #2256F2; font-weight: 400;"
            >{project.framework}</span
          >
        </div>
      </div>
      <div class="project-info__section">
        <div class="project-info__section__title">Languages:</div>
      </div>
      <div class="project-info__section">
        <div class="project-info__section__title">External Links:</div>
      </div>
      <div class="project-info__buttons">
        <button class="project-info__buttons__settings">Settings</button>
        <button class="project-info__buttons__edit">Edit</button>
      </div>
    </div>
  </SideBar>
  <Modal
    open={ModalOpen}
    title="New Component"
    buttons={[
      {
        text: "Close",
        type: "secondary",
        action: () => toggleModal(false),
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
