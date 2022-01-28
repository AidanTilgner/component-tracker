<script>
  export let title, value;
  console.log("Object List Called");
</script>

<div class="object-list-item">
  <p class="object-list-item__title">
    {title}:
  </p>
</div>

<style lang="scss">
  .object-item {
    display: flex;
    flex-direction: column;

    &__title {
      font-size: 24px;
      font-weight: bold;
    }
  }
</style>
