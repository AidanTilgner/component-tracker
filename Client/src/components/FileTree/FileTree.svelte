<script>
  export let project;
  import TreeNode from "./comps/TreeNode.svelte";
  import Node from "./Node.js";
  import { extractTree } from "./fileTree.js";
  import { root } from "./TreeContext.js";

  // TODO: Make this dynamic based on data from the server
  console.log("Project in FileTree: ", project);

  let tree = extractTree(project);
  root.set(tree);
</script>

<div class="file-tree" data-testid="file-tree">
  {#if tree}
    <TreeNode node={tree} parent={null} />
  {/if}
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .file-tree {
    font-family: $font-primary;
  }
</style>
