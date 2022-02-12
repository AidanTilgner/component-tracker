<script>
  export let title, value, settings;
  import Tag from "../../Pills/Tag.svelte";
</script>

<div class="tags-item">
  <p class="tags-item__title">
    {title}:
  </p>
  {#each settings.pills as { name, pill_type, description }}
    <Tag {name} {pill_type} {description} />
  {/each}
</div>

<style lang="scss">
  @import "../../../../styles/partials/variables";
  @import "../../../../styles/partials/typography";
  @import "../../../../styles/partials/mixins";

  .tags-item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &__title {
      font-size: 24px;
      font-weight: 600;
      color: black;
      margin: 0;
      margin-right: 14px;
    }
  }
</style>
