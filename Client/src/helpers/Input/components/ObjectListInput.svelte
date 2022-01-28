<script>
  export let field, onChange;
  import Input from "../Input.svelte";
  import { inferInputTypeFromValueType } from "../../Functions/inference.js";
  import { formatKey } from "../../Functions/formatting.js";

  let inputs = field.value;
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
