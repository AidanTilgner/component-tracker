<script>
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import InfoItem from "../../../helpers/Informative/InfoItem.svelte";
  import { url, params } from "@roxi/routify";
  console.log($url("../"));

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
    imports: [],
    exports: [],
    functions: [],
    connectedFiles: { parents: [], children: [], helpers: [] },
  };
</script>

<Navbar />
<div class="component">
  <Header
    title="Aidan Tilgner/{$params.project}/<span style='font-weight: bold;'>{$params.component}</span>"
    type="breadcrumbs"
  />
  <Header
    title={component.metaData.name}
    type="title"
    buttons={[
      { text: "Edit", type: "secondary", action: "" },
      { text: "Delete", type: "tertiary", action: "" },
    ]}
  />
  <div class="component__meta-info">
    <InfoItem
      title="File Type"
      value={component.metaData.fileType}
      type="normal"
    />
    <InfoItem
      title="Category"
      value={component.metaData.category}
      type="normal"
    />
    <InfoItem title="Path" value={component.metaData.path} type="breadcrumbs" />
    <InfoItem title="Example" value={component.metaData.example} type="link" />
    <InfoItem
      title="Description"
      value={component.metaData.description}
      type="paragraph"
    />
    <InfoItem title="Props" value={component.metaData.props} type="list" />
    <InfoItem title="State" value={component.metaData.state} type="list" />
    <InfoItem title="Tags" value={component.metaData.tags} type="normal" />
  </div>
  <div class="component__section">
    <Header title="Imports" type="subtitle" />
  </div>
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .component {
    @include default-padding;
    background-color: #f8f8f8;
  }
</style>
