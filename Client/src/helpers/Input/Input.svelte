<script>
  export let type, field, required, settings, onChange;

  // Types will be Text, Textarea, Select, MultiSelect, Radio, Object List, String List
  import TextInput from "./components/TextInput.svelte";
  import TextareaInput from "./components/TextareaInput.svelte";
  import SelectInput from "./components/SelectInput.svelte";
  import CheckboxInput from "./components/CheckboxInput.svelte";
  import RadioInput from "./components/RadioInput.svelte";
  import ObjectListInput from "./components/ObjectListInput.svelte";
  import SwitchInput from "./components/SwitchInput.svelte";
  import ArrayListInput from "./components/ArrayListInput.svelte";
  import { inferInputTypeFromValueType } from "../Functions/inference.js";
  import { formatKey } from "../../helpers/Functions/formatting.js";

  !type && (type = inferInputTypeFromValueType(field.value));
</script>

<div class="field">
  <label for={field.id} class="field__label">
    {formatKey(field.name)}
    {#if required}<span style="color:red">*</span>{/if}
  </label>

  <!-- Text -->
  {#if type == "text"}
    <TextInput {field} {onChange} {required} />
  {/if}

  <!-- Textarea -->
  {#if type == "textarea"}
    <TextareaInput {field} {onChange} {required} {settings} />
  {/if}

  <!-- Select -->
  {#if type == "select"}
    <SelectInput {field} {onChange} {required} {settings} />
  {/if}

  <!-- MultiSelect -->
  {#if type == "checkbox"}
    <CheckboxInput {field} {onChange} {required} {settings} />
  {/if}

  <!-- Radio -->
  {#if type == "radio"}
    <RadioInput {field} {onChange} {required} {settings} />
  {/if}

  <!-- Switch -->
  {#if type == "switch"}
    <SwitchInput {field} {onChange} {required} {settings} />
  {/if}

  <!-- Object List -->
  {#if type == "object-list"}
    <ObjectListInput {field} {onChange} {required} {settings} />
  {/if}

  <!-- Array List -->
  {#if type == "array-list"}
    <ArrayListInput {field} {onChange} {required} {settings} />
  {/if}
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .field {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    font-family: $font-primary;

    &__label {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 14px;
      margin-top: 24px;
    }
  }
</style>
