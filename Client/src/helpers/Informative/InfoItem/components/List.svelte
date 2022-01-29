<script>
  export let title, value;
</script>

<div class="list-input">
  <p class="list-input__title">
    {title}:
  </p>
  <div class="list-input__items">
    {#each value as item, idx}
      <p class="list-input__item">
        {@html item}{!(idx === value.length - 1) ? "," : ""}
      </p>
    {/each}
  </div>
</div>

<style lang="scss">
  .list-input {
    display: flex;
    flex-direction: column;

    &__title {
      font-size: 24px;
      font-weight: 600;
      color: black;
      margin: 0;
      margin-right: 14px;
    }

    &__items {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    &__item {
      font-size: 22px;
      font-weight: 400;
      padding: 0;
      margin: 0;
      margin-right: 6px;
    }
  }
</style>
