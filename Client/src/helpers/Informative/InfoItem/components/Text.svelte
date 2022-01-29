<script>
  export let title, value;
  let paragraph = value?.length > 30;
</script>

<div class="text-item" style={paragraph && "display: block;"}>
  <p class="text-item__title" style={paragraph && "margin-bottom: 8px;"}>
    {title}:
  </p>
  <p class="text-item__value">{value}</p>
</div>

<style lang="scss">
  @import "../../../../styles/partials/variables";
  @import "../../../../styles/partials/typography";
  @import "../../../../styles/partials/mixins";

  .text-item {
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
      font-size: 22px;
      font-weight: 400;
      margin: 0;
    }
  }
</style>
