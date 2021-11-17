<script>
  import Icon from "../Helpers/Icon/Icon.svelte";
</script>

<div class="search">
  <input type="text" class="search__input" placeholder="search everything..." />
  <div class="search__icon">
    <Icon name="search" height="20" width="20" />
  </div>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .search {
    width: 336px;
    height: 36px;
    position: relative;
    border-radius: 8px;
    box-shadow: 0.2px 0.2px 7px 0 rgba($color: #000000, $alpha: 0.25);
    overflow: hidden;
    box-sizing: border-box;
    margin: 0 24px;

    &__input {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      border: none;
      padding-left: 24px;
      font-weight: 500;
      height: 100%;
      border-radius: inherit;

      &:focus {
        outline: none;
        padding-left: calc(24px - 1.5px);
        border: 1.5px solid $color-primary;
        color: $color-primary;
      }
    }

    &__icon {
      position: absolute;
      top: 0;
      right: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
    }
  }
</style>
