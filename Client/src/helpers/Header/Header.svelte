<script>
  export let type,
    title = "",
    buttons = [],
    margin = [82, 0, 56, 0];
  import Icon from "../Icon/Icon.svelte";
  import { formatBreadcrumbs } from "../Functions/formatting.js";

  if (type === "breadcrumbs") {
    title = formatBreadcrumbs(title);
  }

  // TODO: Add functionality for all buttons
</script>

<header
  class="header"
  style={`margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`}
  data-testid="header"
>
  <p
    class="header__title"
    style={type === "small-title"
      ? "font-size: 36px; font-weight: 500;"
      : type === "subtitle"
      ? "font-size: 48px;"
      : type === "title"
      ? "font-size: 64px;"
      : type === "breadcrumbs"
      ? "font-size: 24px; color: #3356F2"
      : type === "back-button"
      ? "font-size: 22px; font-weight: 600px; color: #2256f2;"
      : ""}
  >
    {#if type === "back-button"}
      <div class="arrow">
        <Icon name="left_arrow" width="8" height="13" />
      </div>
    {/if}
    {@html title}
  </p>
  <div class="header__buttons">
    {#each buttons as button}
      <button class="header__button {button.type}" on:click={button.action}>
        {#if button.type === "slide-left"}
          <div class="arrow">
            <Icon name="left_arrow" width="8" height="13" />
          </div>
        {/if}
        {button.text}
      </button>
    {/each}
  </div>
</header>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .header {
    font-family: $font-primary;
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

  .tertiary {
    @include button-tertiary;
  }

  .slide-left {
    @include button-slide;
  }

  .arrow {
    display: inline-block;
    margin-right: 0;
  }
</style>
