<script>
  export let open, close;
  import Icon from "../../helpers/Icon/Icon.svelte";
</script>

{#if open}
  <div class="overlay" on:click={close}>
    <div class="sidebar" on:click={(e) => e.stopPropagation()}>
      <div class="sidebar__back" on:click={close}>
        <Icon name="left_arrow" width="8" height="13" />
        <p>back</p>
      </div>
      <slot />
    </div>
  </div>
{/if}

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .overlay {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .sidebar {
    padding-inline-start: 36px;
    padding-inline-end: 36px;
    width: calc(50vw - 72px);
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    background-color: #fff;
    z-index: 2;
    overflow-y: scroll;
    scrollbar-width: none;

    &__back {
      display: flex;
      align-items: center;
      color: $color-primary;
      font-family: $font-primary;
      font-weight: 600;
      margin-top: 36px;
      cursor: pointer;

      & > p {
        margin: 0;
        margin-left: 6px;
        padding: 0;
      }
    }
  }
</style>
