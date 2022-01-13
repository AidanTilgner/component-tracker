<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../components/PreviewGrid/PreviewGrid.svelte";

  import { user } from "../../data/user.js";

  let projects = [];
  user.subscribe((user) => {
    projects = user.projects;
  });
</script>

<Navbar />
<div class="projects" data-testid="projects">
  <Header
    title="Projects"
    type="subtitle"
    buttons={[{ text: "New Project", type: "primary", action: "" }]}
  />
  <PreviewGrid {projects} />
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .projects {
    @include default-padding;
  }
</style>
