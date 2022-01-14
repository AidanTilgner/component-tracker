<script>
  export let field, onChange;
  import Input from "../Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../../Functions/formatting.js";
</script>

{#each Object.keys(field.value) as key}
  <div class="input">
    <Input
      type={inferInputTypeFromValueType(field.value[key])}
      field={{
        value: field.value[key],
        name: formatKey(key),
        onChange: (value) => {
          onChange({
            ...field,
            value: {
              ...field.value,
              [key]: value,
            },
          });
        },
      }}
    />
  </div>
{/each}

<style lang="scss">
  .input {
    padding-inline-start: 24px;
  }
</style>
