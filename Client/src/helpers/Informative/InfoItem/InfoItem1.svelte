<script>
  export let title, value;
  import Text from "./components/Text.svelte";
  import Link from "./components/Link.svelte";
  import List from "./components/List.svelte";
  import Breadcrumbs from "./components/Breadcrumbs.svelte";
  import { inferInfoItemTypeFromValueType } from "../../../helpers/Functions/formatting";

  let type = inferInfoItemTypeFromValueType(value);
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
</div>
