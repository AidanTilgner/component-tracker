<script>
  export let title, value, type;
  import Text from "./components/Text.svelte";
  import Link from "./components/Link.svelte";
  import List from "./components/List.svelte";
  import Breadcrumbs from "./components/Breadcrumbs.svelte";
  import Tags from "./components/Tags.svelte";
  import Object from "./components/Object.svelte";
  import ObjectList from "./components/ObjectList.svelte";
  import { inferInfoItemTypeFromValueType } from "../../../helpers/Functions/inference";
  console.log("%cTitle", "color: green; font-weight: bold;", title);

  !type && (type = inferInfoItemTypeFromValueType(value));

  console.log("%cType", "color: #f00; font-weight: bold;", type);
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
  {#if type === "tags"}
    <Tags {title} {value} />
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
    margin-bottom: 24px;
  }
</style>
