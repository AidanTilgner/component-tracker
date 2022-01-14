<script>
  export let field, onChange;
  import Input from "../Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../../Functions/formatting.js";
  import CheckboxInput from "./CheckboxInput.svelte";

  let inputs = [...field.value];
  let adding = false;

  const addNew = () => {};
</script>

<div class="input">
  {#each inputs as input, idx}
    <div class="input__section">
      <Input
        type="object-list"
        field={{
          value: input,
          name: "",
        }}
        onChange={(e, data) => {
          inputs[idx] = data;
        }}
      />
    </div>
  {/each}
  {#if adding}
    <div class="input__section">
      <Input
        type={inferInputTypeFromValueType(field.value[0])}
        field={{
          value: "",
          name: field.value[0] ? formatKey(field.value[0]) : "",
        }}
        onChange={(e) => {
          inputs.push(e);
        }}
      />
    </div>
  {/if}
  <button
    class="input__button"
    on:click={(e) => {
      console.log("Adding");
      adding = true;
    }}>Add {field.name}</button
  >
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .input {
    &__section {
      border-left: 2px solid $color-orange;
    }

    &__button {
      font-size: 14px;
      height: 26px;
      font-weight: 600;
      border: 1px solid $color-primary;
      background-color: white;
      color: $color-primary;
      width: fit-content;
      margin: 0;
      padding: 4px;
      box-shadow: 0.2px 0.2px 5px 0 rgba(0, 0, 0, 0.25);
      border-radius: 5px;

      &:hover {
        box-shadow: 0.2px 0.2px 0 0 rgba($color: #000000, $alpha: 0.25);
        cursor: pointer;
      }
    }
  }
</style>
