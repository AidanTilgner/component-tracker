<script>
  export let projects;
  import ProjectPreview from "../ProjectPreview/ProjectPreview.svelte";
  // TODO: Make this get the data dynamically from the server
</script>

<div class="grid" data-testid="preview-grid">
  {#each projects as project}
    <ProjectPreview
      title={project.name}
      edited={project.edited}
      framework={project.framework}
      endpoint={project.id}
    />
  {/each}
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/mixins";
  @import "../../styles/partials/typography";
  .grid {
    display: grid;
    // we need 4 columns in each row
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 56px;
    grid-auto-rows: 250px;
  }
</style>
