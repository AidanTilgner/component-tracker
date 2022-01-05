<script>
  export let data, onChange;
  import Input from "../Input/Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../Functions/formatting.js";

  // Make an object that stores the values of the inputs
  let inputs = {};
  Object.keys(data).forEach((key) => {
    inputs[key] = data[key];
  });
</script>

<form class="form" data-testid="form">
  {#each Object.keys(data) as key}
    <Input
      type={data[key].type
        ? data[key].type
        : inferInputTypeFromValueType(data[key])}
      field={{
        id: key + "-" + Math.random().toString(36).substr(2, 5),
        name: formatKey(key),
        value: data[key],
      }}
      onChange={(e) => {
        inputs[key] = e.target.value;
        onChange(e, inputs);
      }}
    />
  {/each}
  <input type="submit" />
</form>

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";
</style>
