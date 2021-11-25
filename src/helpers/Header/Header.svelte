<script>
  export let type;
  export let title;
  export let buttons = [];
</script>

<div class="header">
  <p
    class="header__title"
    style={type === "subtitle"
      ? "font-size: 48px;"
      : type === "breadcrumbs"
      ? "font-size: 24px; color: #3356F2"
      : ""}
  >
    {@html title}
  </p>
  <div class="header__buttons">
    {#each buttons as button}
      <button class="header__button {button.type}" on:click={button.action}>
        {button.text}
      </button>
    {/each}
  </div>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .header {
    @include default-padding;
    font-family: $font-primary;
    margin: 82px 0 56px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      display: inline-block;
      margin: 0;
    }

    &__button {
      @include button;
    }
  }

  .primary {
    @include button-primary;
  }

  .secondary {
    @include button-secondary;
  }
</style>
