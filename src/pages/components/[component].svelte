<script>
  import Navbar from "../components/Navbar/Navbar.svelte";
  import Header from "../helpers/Header/Header.svelte";
  import { url, params } from "@roxi/routify";
  console.log($url("../"));

  let component = {
    name: "Child-1",
    category: "Views",
    path: "src/child1/child1-2",
    example: "www.aidantilgner.dev",
    description: "This is the description of the child-1",
    props: [
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
    imports: [],
    exports: [],
    functions: [],
    connectedFiles: { parents: [], children: [], helpers: [] },
  };
</script>

<Navbar />
<div class="component">
  <Header
    title="back"
    type="back-button"
    link={$url("../")}
    buttons={[{ text: "Delete", type: "tertiary", action: "" }]}
  />
  <Header
    title={component.name}
    type="title"
    buttons={[{ text: "Edit", type: "secondary", action: "" }]}
  />
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .component {
    @include default-padding;
  }
</style>
