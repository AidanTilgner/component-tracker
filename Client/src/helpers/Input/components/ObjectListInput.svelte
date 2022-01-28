<script>
  export let field, onChange;
  import Input from "../Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../../Functions/inference.js";

  let inputs = field.value;
  console.log("Inputs in ObjList: ", inputs);
</script>

{#each Object.keys(field.value) as key}
  <div class="input">
    <Input
      type={inferInputTypeFromValueType(field.value[key])}
      field={{
        value: field.value[key],
        name: formatKey(key),
      }}
      onChange={(e, data) => {
        inputs[key] = data;
        onChange(e, inputs);
      }}
    />
  </div>
{/each}

<style lang="scss">
  .input {
    padding-inline-start: 24px;
  }
</style>
