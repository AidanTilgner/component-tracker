<script>
  export let title, subtitle, endpoint;
  import Icon from "../../Icon/Icon.svelte";
  import { goto } from "@roxi/routify";
</script>

<div
  class="mini-card"
  on:click={(e) => {
    $goto(endpoint);
  }}
>
  <div class="mini-card__text">
    <p class="mini-card__title">{title}</p>
    {#if subtitle}
      <p class="mini-card__subtitle">{subtitle}</p>
    {/if}
  </div>
  <div class="mini-card__icon">
    <Icon name="right_arrow-long" width={"25"} />
  </div>
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .mini-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 2px 2px 8px 0 rgba($color: #000000, $alpha: 0.25);
    padding-inline-start: 24px;
    padding-inline-end: 24px;
    font-family: $font-primary;
    height: 67px;
    cursor: pointer;

    &:hover {
      background-color: #e6e6e6;
    }

    &__text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
    }

    &__title {
      font-size: 20px;
      margin: 0 0 4px 0;
    }

    &__subtitle {
      margin: 0px 0 10px 0;
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
