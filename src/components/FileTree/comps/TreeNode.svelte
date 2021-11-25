<script>
  export let text, type, children, parent;
  let width = text.length * 20;
  let height = type === "folder" ? 60 : 40;
  let open = false;

  /* 
    The plan here is that when the folder is clicked, the children are shown.
    If the children are already showing and the folder is clicked again, the children are hidden.
    If sibling nodes also have children showing, those must be hidden first. 
    This can be achieved by a function on the parent level that remove children showing from the parent's children array.
  */
</script>

<div
  class="tree-node {type === 'folder' ? 'folder' : 'file'} {open &&
    type === 'folder' &&
    'open'}"
  style="width: {width}px; height: {height}px"
  on:click={(e) => {
    e.stopPropagation();
    if (type === "folder" && children) {
      open = !open;
      open ? (width += -4) : (width += 4);
      open ? (height += -4) : (height += 4);
    }
  }}
>
  <p class="tree-node__text">{text}</p>
  {#if open && children}
    <div class="tree-node__children">
      {#each children as child}
        <svelte:self
          text={child.name}
          type={child.type}
          children={child.children}
          parent={this}
        />
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
