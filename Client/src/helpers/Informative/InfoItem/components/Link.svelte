<script>
  export let title, value;
  import { formatLink } from "../../../Functions/formatting";
</script>

<div class="link-item">
  <p class="link-item__title">
    {title}:
  </p>
  <p class="link-item__link">
    {@html formatLink(value)}
  </p>
</div>

<style lang="scss">
  @import "../../../../styles/partials/variables";
  @import "../../../../styles/partials/typography";
  @import "../../../../styles/partials/mixins";

  .link-item {
    display: flex;
    align-items: center;

    &__title {
      font-size: 24px;
      font-weight: 600;
      color: black;
      margin: 0;
      margin-right: 14px;
    }

    &__link {
      font-size: 22px;
      font-weight: 500;
      color: $color-primary;
      margin: 0;
    }
  }
</style>
