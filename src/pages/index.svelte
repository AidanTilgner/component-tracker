<script>
  import { goto } from "@roxi/routify";
  import Navbar from "../components/Navbar/Navbar.svelte";
  import Header from "../helpers/Header/Header.svelte";
  import PreviewGrid from "../components/PreviewGrid/PreviewGrid.svelte";

  // TODO: Add functionality for buttons
</script>

<Navbar />
<div class="home">
  <Header
    title="Recent Projects"
    type="subtitle"
    buttons={[
      {
        text: "All Projects",
        type: "secondary",
        action: () => $goto("/projects"),
      },
      { text: "New Project", type: "primary", action: "" },
    ]}
  />
  <PreviewGrid />
</div>

<style lang="scss">
  @import "../styles/partials/variables.scss";
  @import "../styles/partials/typography.scss";
  @import "../styles/partials/mixins.scss";

  .home {
    @include default-padding;
  }
</style>
