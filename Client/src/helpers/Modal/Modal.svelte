<script>
  export let title, buttons, open;
</script>

{#if open}
  <div class="overlay" data-testid="modal">
    <div class="modal">
      <h1 class="modal__title">{title}</h1>
      <div class="modal__body">
        <slot />
      </div>
      <div class="modal__buttons">
        {#each buttons as button}
          <button
            class="modal__button {button.type === 'primary'
              ? 'btn-primary'
              : button.type === 'secondary'
              ? 'btn-secondary'
              : ''}"
            on:click={button.action}>{button.text}</button
          >
        {/each}
      </div>
    </div>
  </div>
{/if}

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .modal {
    background-color: white;
    width: 60vw;
    height: 75%;
    border-radius: 15px;
    box-shadow: 0.2px 0.2px 10px 0 rgba(0, 0, 0, 0.25);
    font-family: $font-primary;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__title {
      border-bottom: 2px solid lightgray;
      color: black;
      font-size: 36px;
      font-weight: 500;
      margin: 0;
      padding: 36px 36px 24px 36px;
    }

    &__body {
      padding-inline-start: 36px;
      padding-inline-end: 36px;
      padding-block-start: 24px;
      padding-block-end: 24px;
      overflow-y: scroll;
      scrollbar-width: 2px;
    }

    &__buttons {
      border-top: 2px solid lightgray;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding: 24px 36px 36px 36px;
    }

    &__button {
      @include button;
    }
  }

  .btn-primary {
    @include button-primary;
  }

  .btn-secondary {
    @include button-secondary;
  }
</style>
