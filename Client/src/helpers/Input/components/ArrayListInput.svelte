<script>
  export let field, onChange;
  import Input from "../Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../../Functions/formatting.js";

  let inputs = [...field.value];
  let adding = false;

  const addNew = () => {};
</script>

<div class="input">
  {#each field.value as val}
    {console.log("val", val)}
    <Input
      type={inferInputTypeFromValueType(val)}
      field={{
        value: val.value ? val.value : "",
        name: formatKey(field.name),
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  {/each}
  {#if adding}
    <Input
      type={inferInputTypeFromValueType(field.value[0])}
      field={{
        value: "",
        name: field.name ? formatKey(field.name) : "",
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  {/if}
  <button class="input__button">Add {field.name}</button>
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .input {
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
