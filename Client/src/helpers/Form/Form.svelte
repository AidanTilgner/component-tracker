<script>
  export let data, onSubmit, id;
  import Input from "../Input/Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../Functions/formatting.js";

  console.log("data", data);

  // Make an object that stores the values of the inputs
  let inputs = {};
  Object.keys(data).forEach((key) => {
    inputs[key] = data[key];
  });
</script>

<form
  class="form"
  {id}
  data-testid="form"
  on:submit={(e) => {
    e.preventDefault();
    onSubmit(inputs);
  }}
>
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
        console.log("inputs", inputs);
      }}
    />
  {/each}
</form>

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";
</style>
