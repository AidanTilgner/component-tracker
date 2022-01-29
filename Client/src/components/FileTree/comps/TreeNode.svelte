<script>
  import { goto, params, url } from "@roxi/routify";
  import { root } from "../TreeContext";
  export let node, parent;
  let tree;

  root.subscribe((value) => {
    tree = value;
  });
  let text = node.text,
    type = node.type,
    children = node.children,
    width = text.length * 20,
    height = type === "folder" ? 60 : 40,
    open = node.open;

  let resetting = false;

  function toggle(to) {
    if (to != null) {
      node.open = to;
      open = node.open;
    } else {
      node.open = !open;
      open = node.open;
    }
  }

  function removeSiblingsOpen(parent) {
    if (!parent) return;
    let siblings = parent.children;
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] === node) continue;
      siblings[i].open = false;
    }
  }

  function updateTree(tree) {
    root.set(tree);
    reset();
  }

  function reset() {
    resetting = true;
    const rootNode = document.getElementById("tree-root");
    rootNode.click();
    setTimeout(() => {
      rootNode.click();
      resetting = false;
    }, 0.01);
  }
</script>

<div
  id={`${node === tree && "tree-root"}`}
  class="tree-node {type === 'folder' ? 'folder' : 'file'} {open &&
    type === 'folder' &&
    'open'}"
  style="width: {width}px; height: {height}px"
  title={`${type === "folder" ? "Open Folder" : "View Component"}`}
  on:click={(e) => {
    e.stopPropagation();
    if (type === "folder" && children && !resetting) {
      removeSiblingsOpen(parent);
      toggle();
      open ? (width += -4) : (width += 4);
      open ? (height += -4) : (height += 4);
      updateTree(tree);
      return;
    }
    if (type === "file" && node.references.endpoint) {
      $goto(
        $url(`./:component`, {
          component: node.references.endpoint,
        })
      );
    }
  }}
>
  <p class="tree-node__text">{text}</p>
  {#if open}
    <div class="tree-node__children">
      {#each children as child}
        <svelte:self node={child} parent={node} />
      {/each}
    </div>
  {/if}
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables.scss";
  @import "../../../styles/partials/typography.scss";
  @import "../../../styles/partials/mixins.scss";

  .tree-node {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 60px;

    &__text {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    &__children {
      position: absolute;
      bottom: -130px;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .folder {
    box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
    border-radius: 15px;
    cursor: pointer;
  }

  .file {
    box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
    border-radius: 15px;
    border: 2px solid $color-orange;
  }

  .open {
    border-radius: 0;
    border: 2px solid $color-primary;
    box-shadow: inset 0.2px 0.2px 5px 0 rgba($color: #000000, $alpha: 0.25);
  }
</style>
