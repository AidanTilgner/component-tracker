<script>
  import TreeNode from "./comps/TreeNode.svelte";
  import Node from "./Node.js";
  import { root } from "./TreeContext.js";

  /* 
    So basically the plan here is to get the root tree node, and then recursively render each 
    child node under it. 

    We need to replicate the data that we get from the server, so we can use it to render the tree.
    It will come in the form of a tree, where we get a root node, and then we can recursively move through
    the tree, and render each node.
  */

  // First we'll have a node class that will represent different functions of a tree node

  let tree = new Node("src", "folder", {}, [
    new Node("child1", "folder", {}, [
      new Node("child1.1", "folder", {}, []),
      new Node("child1.2", "file", { endpoint: "h489-child1-2" }, []),
      new Node("child1.3", "file", { endpoint: "h489-child1-3" }, []),
    ]),
    new Node("child2", "folder", {}, [
      new Node("child2.1", "folder", {}, []),
      new Node("child2.2", "file", { endpoint: "h489-child2-2" }, []),
      new Node("child2.3", "file", { endpoint: "h489-child2-3" }, []),
    ]),
    new Node("child3", "folder", {}, [
      new Node("grandchild1", "folder", {}, []),
      new Node("grandchild2", "file", { endpoint: "h489-child3-2" }, []),
      new Node("grandchild3", "file", { endpoint: "h489-child3-3" }, []),
    ]),
  ]);
  root.set(tree);
</script>

<div class="file-tree">
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
