<script>
  import ProjectPreview from "../ProjectPreview/ProjectPreview.svelte";
  // TODO: Make this get the data dynamically from the server
</script>

<div class="grid">
  <ProjectPreview
    title="Onyx"
    edited="yesterday"
    framework="react"
    endpoint="h489-onyx"
  />
  <ProjectPreview
    title="Soapbox"
    edited="11/2/21"
    framework="svelte"
    endpoint="h489-soapbox"
  />
  <ProjectPreview
    title="VVibrant Blog"
    edited="10/25/21"
    framework="svelte"
    endpoint="h489-vvibrant_blog"
  />
  <ProjectPreview
    title="Portfolio"
    edited="10/5/21"
    framework="react"
    endpoint="hg7f-portfolio"
  />
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/mixins";
  @import "../../styles/partials/typography";
  .grid {
    @include default-padding;
    display: grid;
    // we need 4 columns in each row
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 56px;
    grid-auto-rows: 250px;
  }
</style>
