<script>
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import Form from "../../../helpers/Form/Form.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem.svelte";
  import Description from "../../../helpers/Informative/Description.svelte";
  import { url, params } from "@roxi/routify";
  import {
    formatKey,
    inferInfoItemTypeFromValueType,
  } from "../../../helpers/Functions/formatting.js";

  let component = {
    metaData: {
      name: "Child-1",
      fileType: "JavaScript",
      category: "Views",
      path: "src/child1/child1-2",
      example: "https://www.aidantilgner.dev",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat orci nulla pellentesque dignissim enim sit. Sapien pellentesque habitant morbi tristique senectus et netus. Nibh venenatis cras sed felis eget velit. Nibh cras pulvinar mattis nunc sed blandit. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. ",
      props: [
        {
          name: "routeProps",
          description:
            "This provides information about the given component for routing",
          type: "Object",
        },
        {
          name: "routeProps",
          description:
            "This provides information about the given component for routing",
          type: "Object",
        },
      ],
      state: [
        {
          name: "data",
          description: "This is the data of the child-1",
          type: "Object",
        },
      ],
      tags: ["Refactor", "Deprecated", "Bugs"],
    },
    imports: [
      {
        name: "React, { useState, UseEffect }",
        from: "react",
        type: "dependency",
        description:
          "React is a JavaScript library for building user interfaces.",
        notes: "Uses deprecated code",
      },
    ],
    exports: [],
    functions: [
      {
        name: "component/getSomething",
        description: "This is a function",
        ExternalLocation: "src/components/helpers/helpers.js",
        parameters: "(int componentID)",
        returns: "(Object something)",
        notes: "Needs to be refactored",
      },
    ],
    connectedFiles: { parents: [], children: [], helpers: [] },
  };

  let EditingMetaData = false;
</script>

<Navbar />
<div class="component" data-testid="component">
  <Header
    title="Aidan Tilgner/{$params.project}/{$params.component}"
    type="breadcrumbs"
  />
  <Header
    title={component.metaData.name}
    type="title"
    buttons={[
      {
        text: "Edit",
        type: "secondary",
        action: () => (EditingMetaData = true),
      },
      { text: "Delete", type: "tertiary", action: "" },
    ]}
  />
  <div class="component__meta-info">
    {#each Object.keys(component.metaData) as key}
      <InfoItem
        title={formatKey(key)}
        value={component.metaData[key]}
        type={inferInfoItemTypeFromValueType(component.metaData[key])}
      />
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
