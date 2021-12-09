<script>
  export let data, onSubmit;

  import Input from "../Input/Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../Functions/formatting.js";
</script>

<form class="form">
  {#each Object.keys(data) as key}
    <Input
      type={inferInputTypeFromValueType(data[key])}
      field={{
        id: key + "-" + Math.random().toString(36).substr(2, 5),
        name: formatKey(key),
      }}
    />
  {/each}
</form>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";
</style>
