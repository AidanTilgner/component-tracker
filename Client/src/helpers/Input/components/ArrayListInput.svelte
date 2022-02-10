<script>
  export let field, settings, onChange;
  import Input from "../Input.svelte";
  import { inferInputTypeFromValueType } from "../../Functions/inference.js";
  import { formatKey } from "../../Functions/formatting";
  import { copyObj } from "../../Functions/typeManipulation.js";

  let inputs = [...settings.inputs];
  let adding = false;
  let newInput = settings.inputs[0];
</script>

<div class="input">
  <div class="input__current-values">
    <!--Takes in settings.currentValue as an array of objects that represent the current state of the array-->
    {#if settings.currentValue}
      {#each settings.currentValue as value}
        <div class="input__section">
          {#each value as field}
            <div class="input__field">
              <Input
                type={field.type}
                value={field.value}
                onChange={(e) => {
                  onChange(e, value, field);
                }}
              />
            </div>
          {/each}
        </div>
      {/each}
    {/if}
  </div>
  <div class="input__inputs">
    {#each settings.inputs as input, idx}
      <div class="input__section">
        <Input
          type={input.type}
          field={{
            value: input.value,
            name: input.name,
            settings: input.settings,
          }}
          onChange={(e, data) => {
            inputs[idx] = data;
            onChange(e, inputs);
          }}
        />
      </div>
    {/each}
  </div>
  {#if adding}
    <div class="input__section">
      <Input
        type={newInput.type}
        field={{
          value: newInput.value,
          name: newInput.name,
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
            inputs = inputs;
            adding = false;
          }}>Done</button
        >
      </div>
    </div>
  {/if}
  <button
    class="input__button"
    on:click={(e) => {
      e.preventDefault();
      adding = true;
    }}>Add {field.name}</button
  >
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .input {
    &__inputs {
      border-left: 2px solid $color-orange;
      padding-inline-start: 24px;
    }
    &__section {
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
