<script>
  export let options,
    showing,
    position = {
      top: 0,
      left: 0,
      right: "",
      bottom: "",
    };
  import Icon from "../Icon/Icon.svelte";
</script>

{#if showing}
  <div
    class="dropdown"
    style={`top: ${position.top};left: ${position.left};right: ${position.right};bottom: ${position.bottom};`}
  >
    {#each options as option}
      <p
        class="dropdown__item"
        on:click={(e) => {
          e.preventDefault();
          showing = false;
          option.action(e);
        }}
      >
        {@html option.label}
      </p>
    {/each}
    <div
      class="dropdown__close"
      title="Close Dropdown"
      on:click={(e) => {
        showing = false;
      }}
    >
      <Icon name="close" width="20px" height="20px" color="#a64128" />
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/mixins";
  @import "../../styles/partials/typography";

  .dropdown {
    position: absolute;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &__item {
      padding: 4px 14px;
      margin: 0;
      width: 100px;
      cursor: pointer;
      background-color: white;
      margin-bottom: 4px;
      border: 0.5px solid rgba($color: $color-black, $alpha: 0.25);
      border-radius: 4px;
      &:hover {
        background-color: $color-primary;
        color: white;
      }
    }

    &__close {
    }
  }
</style>
