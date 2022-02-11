<script>
  export let title, value;
  import { formatBreadcrumbs } from "../../../Functions/formatting.js";
</script>

<div class="breadcrumbs">
  <p class="breadcrumbs__title">
    {title}:
  </p>
  <p class="breadcrumbs__value">{@html formatBreadcrumbs(value)}</p>
</div>

<style lang="scss">
  @import "../../../../styles/partials/variables";
  @import "../../../../styles/partials/typography";
  @import "../../../../styles/partials/mixins";

  .breadcrumbs {
    display: flex;
    align-items: center;

    &__title {
      font-size: 24px;
      font-weight: 600;
      color: black;
      margin: 0;
      margin-right: 14px;
    }

    &__value {
      font-size: 20px;
      color: $color-primary;
      margin: 0;
    }
  }
</style>
