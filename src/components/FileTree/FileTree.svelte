<script>
  import TreeNode from "./comps/TreeNode.svelte";

  /* 
    So basically the plan here is to get the root tree node, and then recursively render each 
    child node under it. 

    We need to replicate the data that we get from the server, so we can use it to render the tree.
    It will come in the form of a tree, where we get a root node, and then we can recursively move through
    the tree, and render each node.
  */

  let treeData = {
    id: "root",
    name: "src",
    type: "folder",
    parent: null,
    children: [
      {
        id: "child1",
        type: "folder",
        name: "child-folder",
        parent: "root",
        children: [
          {
            id: "child1-2",
            type: "folder",
            name: "child-folder-2",
            parent: "child1",
            children: null,
          },
          {
            id: "child1-1",
            type: "file",
            name: "child-file.js",
            parent: "child1",
            children: null,
          },
        ],
      },
    ],
  };
</script>

<div class="file-tree">
  <TreeNode
    text={treeData.name}
    type={treeData.type}
    children={treeData.children}
    parent={treeData.parent}
  />
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .file-tree {
    @include default-padding;
    font-family: $font-primary;
  }
</style>
