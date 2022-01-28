<script>
  export let data, onChange;
  import Input from "../Input/Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../Functions/inference.js";

  console.log("Data: ", data);

  // Make an object that stores the values of the inputs
  let inputs = {};
  Object.keys(data).forEach((key) => {
    inputs[key] = data[key];
  });

  $: console.log("Inputs: ", inputs);
</script>

<form class="form" data-testid="form" on:submit|preventDefault={(e) => {}}>
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
      onChange={(e, data) => {
        inputs[key] = data;
        onChange(e, inputs);
      }}
    />
  {/each}
</form>

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";
</style>
