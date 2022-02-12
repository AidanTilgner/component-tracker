<script>
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import Form from "../../../helpers/Form/Form.svelte";
  import NonDynamic from "../../../helpers/Form/NonDynamic.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem/InfoItem.svelte";
  import Description from "../../../helpers/Informative/Description.svelte";
  import AlertBanner from "../../../helpers/Informative/AlertBanner/AlertBanner.svelte";
  import { url, params, goto } from "@roxi/routify";
  import { user } from "../../../data/user.js";
  import { onMount } from "svelte";
  import {
    getProject,
    getComponent,
    updateComponent,
    deleteComponent,
  } from "../../../helpers/Functions/backend.js";
  import { verifyLoginStatus } from "../../../helpers/Functions/authentication.js";
  import {
    editableComponentFileSchema,
    editableComponentMetaDataSchema,
    newComponentFileSchema,
    componentPillSchema,
    deleteComponentPillSchema,
    newComponentFunctionSchema,
    editableComponentFunctionSchema,
  } from "../../../helpers/Functions/formSchemas.js";

  let userData = {};
  user.subscribe((data) => {
    userData = data;
  });

  let project = {};

  let component = {
    creator: { name: "", user_id: "" },
    metaData: {
      category: "",
      path: "",
      example: "",
      description: "",
      props: [
        {
          name: "",
          description: "",
          pill_type: "",
        },
      ],
      state: [
        {
          name: "",
          description: "",
          pill_type: "",
        },
      ],
      tags: [{ name: "", pill_type: "", description: "" }],
    },
    imports: [],
    exports: [],
    functions: [],
    connectedFiles: { parents: [], children: [], helpers: [] },
  };

  let alertBanner = {
    showing: false,
    message: "",
    type: "error",
  };

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (!isLoggedIn) {
        $goto("/users/login");
      }
      project = (await getProject($params.project)).project;
      const response = await getComponent(
        $params.project,
        $params.component.split("+").join("/")
      );
      if (response.error) {
        alertBanner.showing = true;
        alertBanner.message = response.error;
        alertBanner.type = "error";
      }
      alertBanner.showing = false;
      alertBanner.message = response.message;
      alertBanner.type = "success";
      component = response.component;
    } catch (error) {
      console.log("Error in onMount: ", error);
    }
  });

  let EditingMetaData = false;
  let metaDataSubmittable = false;
  let sectionModal = false;
  let sectionModalData = {};
</script>

<Navbar />
<AlertBanner
  showing={alertBanner.showing}
  message={alertBanner.message}
  type={alertBanner.type}
/>
<Modal
  open={EditingMetaData}
  title="Editing Info"
  buttons={[
    {
      text: "Close",
      type: "secondary",
      action: () => (EditingMetaData = false),
    },
    // TODO: Create a new way of submitting the form
    {
      text: "Submit",
      type: "primary",
      action: async () => {
        if (!sectionModalData.submittable) {
          alertBanner.showing = true;
          alertBanner.message = "Please fill out all required fields";
          alertBanner.type = "error";
          return;
        }
        EditingMetaData = false;
        const response = await updateComponent(
          $params.project,
          $params.component.split("+").join("/"),
          { metaData: component.metaData }
        );
        if (response.error) {
          alertBanner.showing = true;
          alertBanner.message = response.error;
          alertBanner.type = "error";
        }
        alertBanner.showing = true;
        alertBanner.message = response.message;
        alertBanner.type = "success";
        component = response.component;
      },
    },
  ]}
>
  <NonDynamic
    fields={editableComponentMetaDataSchema(component.metaData)}
    onChange={(e, inputs, submittable) => {
      e.preventDefault();
      metaDataSubmittable = submittable;
      component.metaData = inputs;
    }}
  />
</Modal>
<Modal
  open={sectionModal}
  title={sectionModalData.title}
  buttons={[
    {
      text: "Close",
      type: "secondary",
      action: () => (sectionModal = false),
    },
    {
      text: "Submit",
      type: "primary",
      action: async () => {
        if (!sectionModalData.submittable) {
          alertBanner.showing = true;
          alertBanner.message = "Please fill out all required fields";
          alertBanner.type = "error";
          return;
        }
        const response = await sectionModalData.action(sectionModalData.inputs);
        if (response.error) {
          alertBanner.showing = true;
          alertBanner.message = response.error;
          alertBanner.type = "error";
        }
        alertBanner.showing = true;
        alertBanner.message = response.message;
        alertBanner.type = "success";
        component = response.component;
        sectionModal = false;
      },
    },
  ]}
>
  <NonDynamic
    fields={sectionModalData.fields}
    onChange={(e, inputs, submittable) => {
      e.preventDefault();
      sectionModalData.submittable = submittable;
      sectionModalData.inputs = inputs;
    }}
  />
</Modal>
<div class="component" data-testid="component">
  <Header
    title={`
      <a href="${$url(
        "/projects"
      )}" style="color:#2256f2;text-decoration:none;">
        ${userData.username}
      </a> /   
      <a href="${$url("/projects/:project", {
        project: project.project_id,
      })}" style="color:#2256f2;text-decoration:none;">
        ${project.name}
      </a> /
      <span style='font-weight:bold;'>
          ${$params.component.split("+").join(" / ")}
      </span>
    `}
    type="breadcrumbs"
  />
  <Header
    title={component.metaData.path.split("/")[
      component.metaData.path.split("/").length - 1
    ]}
    type="title"
    buttons={[
      {
        text: "Edit",
        type: "secondary",
        action: () => (EditingMetaData = true),
      },
      {
        text: "Delete",
        type: "tertiary",
        action: () => {
          deleteComponent(
            $params.project,
            $params.component.split("+").join("/")
          );
          $goto("/projects/" + $params.project);
        },
      },
    ]}
  />
  <div class="component__section">
    <Header title="Meta Data" type="small-title" margin={[56, 0, 24, 0]} />
    {#if component.metaData.category && component.metaData.category !== ""}
      <InfoItem
        type="text"
        title="Category"
        value={component.metaData.category}
      />
    {/if}
    {#if component.metaData.path && component.metaData.path !== ""}
      <InfoItem
        type="breadcrumbs"
        title="Path"
        value={component.metaData.path}
      />
    {/if}
    {#if component.metaData.example && component.metaData.example !== ""}
      <InfoItem
        type="link"
        title="Example"
        value={component.metaData.example}
      />
    {/if}
    {#if component.metaData.description && component.metaData.description !== ""}
      <InfoItem
        type="text"
        title="Description"
        value={component.metaData.description}
      />
    {/if}
  </div>
  <div class="component__section">
    <Header
      title="Tags"
      type="small-title"
      margin={[56, 0, 24, 0]}
      buttons={[
        {
          text: "Delete Tag",
          type: "tertiary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "Delete Tag",
              fields: deleteComponentPillSchema(component.metaData.tags),
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    metaData: {
                      ...component.metaData,
                      tags: component.metaData.tags.filter(
                        (tag, index) => index !== Number(inputs.pill)
                      ),
                    },
                  }
                );
                return response;
              },
            };
          },
        },
        {
          text: "New Tag",
          type: "primary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "New Tag",
              fields: componentPillSchema,
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    metaData: {
                      ...component.metaData,
                      tags: [...component.metaData.tags, inputs],
                    },
                  }
                );
                return response;
              },
            };
          },
        },
      ]}
    />
    {#if component.metaData.tags.length > 0}
      <InfoItem
        title="Tags"
        type="pills"
        settings={{ pills: component.metaData.tags }}
      />
    {/if}
  </div>
  <div class="component__section">
    <Header
      title="Props"
      type="small-title"
      margin={[56, 0, 24, 0]}
      buttons={[
        {
          text: "Delete Prop",
          type: "tertiary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "Delete Prop",
              fields: deleteComponentPillSchema(component.metaData.props),
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    metaData: {
                      ...component.metaData,
                      props: component.metaData.props.filter(
                        (prop, index) => index !== Number(inputs.pill)
                      ),
                    },
                  }
                );
                return response;
              },
            };
          },
        },
        {
          text: "New Prop",
          type: "primary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "New Prop",
              fields: componentPillSchema,
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    metaData: {
                      ...component.metaData,
                      props: [...component.metaData.props, inputs],
                    },
                  }
                );
                return response;
              },
            };
          },
        },
      ]}
    />
    {#if component.metaData.props.length > 0}
      <InfoItem
        title="Props"
        type="pills"
        settings={{ pills: component.metaData.props }}
      />
    {/if}
  </div>
  <div class="component__section">
    <Header
      title="State"
      type="small-title"
      margin={[56, 0, 24, 0]}
      buttons={[
        {
          text: "Delete State",
          type: "tertiary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "Delete State",
              fields: deleteComponentPillSchema(component.metaData.state),
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    metaData: {
                      ...component.metaData,
                      state: component.metaData.state.filter(
                        (state, index) => index !== Number(inputs.pill)
                      ),
                    },
                  }
                );
                return response;
              },
            };
          },
        },
        {
          text: "New State",
          type: "primary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "New State",
              fields: componentPillSchema,
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    metaData: {
                      ...component.metaData,
                      state: [...component.metaData.state, inputs],
                    },
                  }
                );
                return response;
              },
            };
          },
        },
      ]}
    />
    {#if component.metaData.state.length > 0}
      <InfoItem
        title="Tags"
        type="pills"
        settings={{ pills: component.metaData.state }}
      />
    {/if}
  </div>
  <div class="component__section">
    <Header
      title="Imports"
      type="small-title"
      margin={[56, 0, 24, 0]}
      buttons={[
        {
          text: "New Import",
          type: "primary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "New Import",
              fields: newComponentFileSchema,
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    imports: [
                      ...component.imports,
                      {
                        name: inputs.name,
                        path: inputs.path,
                        data_type: inputs.data_type,
                        description: inputs.description,
                        notes: inputs.notes,
                      },
                    ],
                  }
                );
                return response;
              },
            };
          },
        },
      ]}
    />
    {#each component.imports as imp}
      <Description
        title={imp.name}
        values={editableComponentFileSchema(imp)}
        onChange={(e, values) => {
          // TODO: Fix bug where the description title is not updated
          e.preventDefault();
          imp = values;
        }}
        onSubmit={async (inputs) => {
          const response = await updateComponent(
            $params.project,
            $params.component.split("+").join("/"),
            {
              imports: component.imports,
            }
          );
          if (response.error) {
            alertBanner.showing = true;
            alertBanner.message = response.error;
            alertBanner.type = "error";
          }
          alertBanner.showing = true;
          alertBanner.message = response.message;
          alertBanner.type = "success";
        }}
        buttons={[
          {
            text: "Delete",
            type: "tertiary",
            action: async () => {
              const response = await updateComponent(
                $params.project,
                $params.component.split("+").join("/"),
                {
                  imports: component.imports.filter((i) => i.name !== imp.name),
                }
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
              component = response.component;
            },
          },
        ]}
      />
    {/each}
  </div>
  <div class="component__section">
    <Header
      title="Exports"
      type="small-title"
      margin={[56, 0, 24, 0]}
      buttons={[
        {
          text: "New Export",
          type: "primary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "New Import",
              fields: newComponentFileSchema,
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    exports: [
                      ...component.exports,
                      {
                        name: inputs.name,
                        path: inputs.path,
                        data_type: inputs.data_type,
                        description: inputs.description,
                        notes: inputs.notes,
                      },
                    ],
                  }
                );
                return response;
              },
            };
          },
        },
      ]}
    />
    {#each component.exports as exp}
      <Description
        title={exp.name}
        values={editableComponentFileSchema(exp)}
        onChange={(e, values) => {
          e.preventDefault();
          exp = values;
        }}
        onSubmit={async (inputs) => {
          const response = await updateComponent(
            $params.project,
            $params.component.split("+").join("/"),
            {
              exports: component.exports,
            }
          );
          if (response.error) {
            alertBanner.showing = true;
            alertBanner.message = response.error;
            alertBanner.type = "error";
          }
          alertBanner.showing = true;
          alertBanner.message = response.message;
          alertBanner.type = "success";
        }}
        buttons={[
          {
            text: "Delete",
            type: "tertiary",
            action: async () => {
              const response = await updateComponent(
                $params.project,
                $params.component.split("+").join("/"),
                {
                  exports: component.exports.filter((i) => i.name !== exp.name),
                }
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
              component = response.component;
            },
          },
        ]}
      />
    {/each}
  </div>
  <div class="component__section">
    <Header
      title="Functions"
      type="small-title"
      margin={[56, 0, 24, 0]}
      buttons={[
        {
          text: "New Function",
          type: "primary",
          action: () => {
            sectionModal = true;
            sectionModalData = {
              title: "New Import",
              fields: newComponentFunctionSchema,
              action: async (inputs) => {
                const response = await updateComponent(
                  $params.project,
                  $params.component.split("+").join("/"),
                  {
                    functions: [
                      ...component.functions,
                      {
                        name: inputs.name,
                        path: inputs.path,
                        returns: inputs.returns,
                        parameters: inputs.parameters,
                        description: inputs.description,
                        lifecycle: inputs.lifecycle,
                        notes: inputs.notes,
                      },
                    ],
                  }
                );
                return response;
              },
            };
          },
        },
      ]}
    />
    {#each component.functions as func}
      <Description
        title={func.name}
        values={editableComponentFunctionSchema(func)}
        onChange={(e, values) => {
          e.preventDefault();
          func = values;
        }}
        onSubmit={async (inputs) => {
          const response = await updateComponent(
            $params.project,
            $params.component.split("+").join("/"),
            {
              functions: component.functions,
            }
          );
          if (response.error) {
            alertBanner.showing = true;
            alertBanner.message = response.error;
            alertBanner.type = "error";
          }
          alertBanner.showing = true;
          alertBanner.message = response.message;
          alertBanner.type = "success";
        }}
        buttons={[
          {
            text: "Delete",
            type: "tertiary",
            action: async () => {
              const response = await updateComponent(
                $params.project,
                $params.component.split("+").join("/"),
                {
                  functions: component.functions.filter(
                    (i) => i.name !== func.name
                  ),
                }
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
              component = response.component;
            },
          },
        ]}
      />
    {/each}
  </div>
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .component {
    @include default-padding;
    background-color: #f8f8f8;

    &__section {
      border-bottom: 1px solid rgba($color: $color-black, $alpha: 0.1);
    }
  }
</style>
