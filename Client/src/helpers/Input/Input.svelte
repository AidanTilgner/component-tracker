<script>
  export let type, field, onChange;

  // Types will be Text, Textarea, Select, MultiSelect, Radio, Object List, String List
  import TextInput from "./components/TextInput.svelte";
  import TextareaInput from "./components/TextareaInput.svelte";
  import SelectInput from "./components/SelectInput.svelte";
  import CheckboxInput from "./components/CheckboxInput.svelte";
  import RadioInput from "./components/RadioInput.svelte";
  import ObjectListInput from "./components/ObjectListInput.svelte";
  import StringListInput from "./components/StringListInput.svelte";

  // ! Finish implementing onChange event for the rest of the types
</script>

<div class="field">
  <label for={field.id} class="field__label">{field.name}</label>

  <!-- Text -->
  {#if type == "text"}
    <TextInput {field} {onChange} />
  {/if}

  <!-- Textarea -->
  {#if type == "textarea"}
    <TextareaInput {field} {onChange} />
  {/if}

  <!-- Select -->
  {#if type == "select"}
    <SelectInput {field} {onChange} />
  {/if}

  <!-- MultiSelect -->
  {#if type == "checkbox"}
    <CheckboxInput {field} {onChange} />
  {/if}

  <!-- Radio -->
  {#if type == "radio"}
    <RadioInput {field} {onChange} />
  {/if}

  <!-- Object List -->
  {#if type == "object-list"}
    <ObjectListInput {field} {onChange} />
  {/if}

  <!-- String List -->
  {#if type == "string-list"}
    <StringListInput {field} {onChange} />
  {/if}
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .field {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    font-family: $font-primary;

    &__label {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 14px;
    }
  }
</style>
