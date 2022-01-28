<script>
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import Form from "../../../helpers/Form/Form.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem/InfoItem.svelte";
  import Description from "../../../helpers/Informative/Description.svelte";
  import { url, params, meta, goto } from "@roxi/routify";
  import { inferInfoItemTypeFromValueType } from "../../../helpers/Functions/inference.js";
  import { formatKey } from "../../../helpers/Functions/formatting.js";
  import { user } from "../../../data/user.js";
  import { onMount } from "svelte";
  import {
    getUserFromLogin,
    getProject,
    getComponent,
    updateComponent,
    deleteComponent,
  } from "../../../helpers/Functions/backend.js";

  let userData = {};
  user.subscribe((data) => {
    userData = data;
  });

  let project = {};

  let component = {
    creator: { name: "", id: "" },
    metaData: {
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
    },
    imports: [],
    exports: [],
    functions: [],
    connectedFiles: { parents: [], children: [], helpers: [] },
  };

  $: metaData = Object.keys(component.metaData);

  onMount(async () => {
    project = await getProject($params.project);
    component = await getComponent(
      $params.project,
      $params.component.split("+").join("/")
    );
    if (!userData.username) {
      user.set(await getUserFromLogin("Aidan.Tilgner", "password"));
    }
  });

  let EditingMetaData = false;
</script>

<Navbar />
<div class="component" data-testid="component">
  <Header
    title={`
      <a href="/projects" style="color:#2256f2;text-decoration:none;">
        ${userData.username}
      </a> /   
      <a href="/projects/${
        $params.project
      }" style="color:#2256f2;text-decoration:none;">
        ${$params.component.split("+")[$params.component.split("+").length - 1]}
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
  <div class="component__meta-info">
    {#each metaData as key}
      <InfoItem title={formatKey(key)} value={component.metaData[key]} />
    {/each}
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
          action: () => {
            EditingMetaData = false;
            updateComponent(
              $params.project,
              $params.component.split("+").join("/"),
              { metaData: component.metaData }
            );
          },
        },
      ]}
    >
      <Form
        data={component.metaData}
        onChange={(e, inputs) => {
          e.preventDefault();
          component.metaData = inputs;
        }}
      />
    </Modal>
  </div>
  {#if component.imports[0]}
    <div class="component__section">
      <Header title="Imports" type="subtitle" />
      {#each component.imports as imp}
        <Description
          title={imp.name}
          values={Object.keys(imp).map((key) => {
            return {
              title: formatKey(key),
              text: imp[key],
              type: inferInfoItemTypeFromValueType(imp[key]),
            };
          })}
          onChange={(e, values) => {
            // TODO: Fix bug where the description title is not updated
            e.preventDefault();
            imp = values;
          }}
        />
      {/each}
    </div>
  {/if}
  {#if component.exports[0]}
    <div class="component__section">
      <Header title="Exports" type="subtitle" />
      {#each component.exports as exp}
        <Description
          title={exp.name}
          values={Object.keys(exp).map((key) => {
            return {
              title: formatKey(key),
              text: exp[key],
              type: inferInfoItemTypeFromValueType(exp[key]),
            };
          })}
          onChange={(e, values) => {
            // TODO: Fix bug where the description title is not updated
            e.preventDefault();
            exp = values;
          }}
        />
      {/each}
    </div>{/if}
  {#if component.functions[0]}
    <div class="component__section">
      <Header title="Functions" type="subtitle" />
      {#each component.functions as func}
        <Description
          title={func.name}
          values={Object.keys(func).map((key) => {
            return {
              title: formatKey(key),
              text: func[key],
              type: inferInfoItemTypeFromValueType(func[key]),
            };
          })}
          onChange={(e, values) => {
            // TODO: Fix bug where the description title is not updated
            e.preventDefault();
            func = values;
          }}
        />
      {/each}
    </div>
  {/if}
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .component {
    @include default-padding;
    background-color: #f8f8f8;

    &__section {
    }
  }
</style>
