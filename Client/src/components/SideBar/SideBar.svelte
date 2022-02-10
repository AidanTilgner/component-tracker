<script>
  export let open, close, buttons;
  import Icon from "../../helpers/Icon/Icon.svelte";
</script>

{#if open}
  <div class="overlay" on:click={close} data-testid="sidebar">
    <div class="sidebar" on:click={(e) => e.stopPropagation()}>
      <div class="sidebar__back" on:click={close}>
        <Icon name="left_arrow" width="8" height="13" />
        <p>back</p>
      </div>
      <slot />
      {#if buttons}
        <div class="sidebar__buttons">
          {#each buttons as button}
            <button
              class="sidebar__button btn-{button.type}"
              on:click={button.action}>{button.text}</button
            >
          {/each}
        </div>
      {/if}
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

    &__buttons {
      display: flex;
      margin: 0;
      justify-content: flex-end;
      position: fixed;
      bottom: 0;
      right: 0;
      width: calc(50vw - 48px);
      padding: 24px;
      background-color: white;
    }

    &__button {
      @include button;
    }
  }

  .btn {
    &-primary {
      @include button-primary;
    }

    &-secondary {
      @include button-secondary;
    }

    &-tertiary {
      @include button-tertiary;
    }

    &-text {
      @include button-text;
    }
  }
</style>
