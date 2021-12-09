<script>
  export let title, values;
  import InfoItem from "./InfoItem.svelte";
  import Header from "../../helpers/Header/Header.svelte";
</script>

<div class="description">
  <Header
    {title}
    type="breadcrumbs"
    margin={[0, 0, 36, 0]}
    buttons={[
      {
        text: "Edit",
        type: "secondary",
        action: "",
      },
    ]}
  />
  <div class="description__border" />
  {#each values as value}
    <InfoItem title={value.title} value={value.text} type={value.type} />
  {/each}
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .description {
    position: relative;
    padding-inline-start: 28px;

    &__border {
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: $color-orange;
      border-radius: 25px;
    }
  }
</style>
