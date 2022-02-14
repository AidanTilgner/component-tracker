<script>
  export let sections, action;
  let selected = sections[0];
</script>

<div class="sections">
  {#each sections as section}
    <span
      on:click={(e) => {
        selected = section;
        action && action(e, selected);
      }}
      class="sections__section {selected.name === section.name && 'active'}"
    >
      {section.name}
    </span>
  {/each}
</div>

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .sections {
    margin: 36px 0 56px 0;
    font-family: $font-primary;

    &__section {
      padding: 8px 14px;
      display: inline-block;
      font-size: 24px;
      cursor: pointer;
    }
  }

  .active {
    border-bottom: 2px solid $color-primary;
  }
</style>
