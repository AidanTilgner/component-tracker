<script>
  export let field, onChange;
  import Input from "../Input.svelte";
  import {
    formatKey,
    inferInputTypeFromValueType,
  } from "../../Functions/formatting.js";
  import { copyObj } from "../../Functions/typeManipulation.js";

  let inputs = [...field.value];
  let adding = false;
  let newInput = {};
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
          console.log("Inputs: ", inputs);
          onChange(e, inputs);
        }}
      />
    </div>
  {/each}
  {#if adding}
    <div class="input__section">
      <Input
        type="object-list"
        field={{
          value: inputs[0] ? copyObj(inputs[0]) : "",
          name: "",
        }}
        onChange={(e, value) => {
          newInput = value;
          onChange(e, inputs);
        }}
      />
      <div class="input__new-buttons">
        <button
          class="input__new-buttons__cancel"
          on:click={(e) => {
            e.preventDefault();
            adding = false;
          }}>Cancel</button
        >
        <button
          class="input__new-buttons__done"
          on:click={(e) => {
            e.preventDefault();
            inputs.push(newInput);
            adding = false;
          }}>Done</button
        >
      </div>
    </div>
  {/if}
  <button
    class="input__button"
    on:click={(e) => {
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
      @include button-little;
      @include button-primary;
      margin-top: 14px;
    }

    &__new-buttons {
      width: 52%;
      display: flex;
      justify-content: right;
      padding-bottom: 24px;

      &__cancel {
        @include button-little;
        @include button-tertiary;
        margin-right: 8px;
      }

      &__done {
        @include button-little;
        @include button-primary;
      }
    }
  }
</style>
