<script>
  export let title, value;
  import InfoItem from "../InfoItem.svelte";
</script>

<div class="object-list-item">
  <p class="object-list-item__title">
    {title}:
  </p>
  <div class="object-list-item__items">
    {#each value as item, idx}
      <InfoItem title={idx + 1} value={item} />
    {/each}
  </div>
</div>

<style lang="scss">
  .object-list-item {
    display: flex;
    flex-direction: column;

    &__title {
      font-size: 24px;
      margin: 0;
      margin-top: 14px;
      font-weight: bold;
    }

    &__items {
      padding-inline-start: 14px;
    }
  }
</style>
