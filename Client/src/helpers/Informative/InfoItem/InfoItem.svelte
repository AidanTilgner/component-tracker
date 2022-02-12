<script>
  export let title, value, type, settings;
  import Text from "./components/Text.svelte";
  import Link from "./components/Link.svelte";
  import List from "./components/List.svelte";
  import Breadcrumbs from "./components/Breadcrumbs.svelte";
  import Tags from "./components/Tags.svelte";
  import Object from "./components/Object.svelte";
  import ObjectList from "./components/ObjectList.svelte";
  import { inferInfoItemTypeFromValueType } from "../../../helpers/Functions/inference";

  !type && (type = inferInfoItemTypeFromValueType(value));
</script>

<div class="info-item">
  {#if type === "text"}
    <Text {title} {value} />
  {/if}
  {#if type === "link"}
    <Link {title} {value} />
  {/if}
  {#if type === "list"}
    <List {title} {value} />
  {/if}
  {#if type === "breadcrumbs"}
    <Breadcrumbs {title} {value} />
  {/if}
  {#if type === "pills"}
    <Tags {title} {value} {settings} />
  {/if}
  {#if type === "object"}
    <Object {title} {value} />
  {/if}
  {#if type === "object-list"}
    <ObjectList {title} {value} />
  {/if}
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .info-item {
    font-family: $font-primary;
    margin: 10px 0;
  }
</style>
