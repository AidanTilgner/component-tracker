<script>
  export let field, settings, onChange;
  import Input from "../Input.svelte";
  import { inferInputTypeFromValueType } from "../../Functions/inference.js";
  import { formatKey } from "../../Functions/formatting.js";

  let inputs = {};
  settings.inputs.forEach((input) => {
    inputs[input.name.toLowerCase()] = input.value;
  });
</script>

{#each settings.inputs as input}
  <div class="input">
    <Input
      type={input.type}
      field={{
        value: input.value,
        name: formatKey(input.name),
      }}
      onChange={(e, data) => {
        inputs[input.name.toLowerCase()] = data;
        onChange(e, settings.inputs);
      }}
    />
  </div>
{/each}

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .input {
    padding-inline-start: 24px;
    border-left: 2px solid rgba($color: $color-black, $alpha: 0.25);
  }
</style>
