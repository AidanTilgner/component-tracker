<script>
  export let title, value;
  import InfoItem from "../InfoItem.svelte";
  import { formatKey } from "../../../Functions/formatting";
</script>

<div class="object-item">
  <p class="object-item__title">
    {title}:
  </p>
  <div class="object-item__items">
    {#each Object.keys(value) as key}
      <div class="object-item__item">
        <InfoItem title={formatKey(key)} value={value[key]} />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../../../../styles/partials/variables";
  @import "../../../../styles/partials/typography";
  @import "../../../../styles/partials/mixins";

  .object-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &__title {
      font-size: 24px;
      font-weight: 600;
      color: black;
      margin: 0;
      margin-right: 14px;
    }

    &__item {
      display: flex;
      flex-direction: row;
      margin-top: 8px;
      padding: 4px 8px;
      border-left: 2px solid $color-orange;

      &-title {
        margin: 0;
        margin-right: 14px;
        font-size: 18px;
        font-weight: 600;
      }

      &-value {
        font-size: 18px;
        font-weight: 400;
        margin: 0;
      }
    }
  }
</style>
