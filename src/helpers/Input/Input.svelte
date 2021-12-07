<script>
  export let type, field;

  // Types will be Text, Textarea, Select, MultiSelect, Radio, Object List, String List
  import TextInput from "./components/TextInput.svelte";
  import TextareaInput from "./components/TextareaInput.svelte";
  import SelectInput from "./components/SelectInput.svelte";
  import MultiselectInput from "./components/MultiselectInput.svelte";
  import RadioInput from "./components/RadioInput.svelte";
  import ObjectListInput from "./components/ObjectListInput.svelte";
  import StringListInput from "./components/StringListInput.svelte";

  console.log("ID: ", field.id);
</script>

<div class="field">
  <label for={field.id} class="field__label">{field.name}</label>

  <!-- Text -->
  {#if type == "text"}
    <TextInput {field} />
  {/if}

  <!-- Textarea -->
  {#if type == "textarea"}
    <TextareaInput {field} />
  {/if}

  <!-- Select -->
  {#if type == "select"}
    <SelectInput {field} />
  {/if}

  <!-- MultiSelect -->
  {#if type == "multi-select"}
    <MultiselectInput {field} />
  {/if}

  <!-- Radio -->
  {#if type == "radio"}
    <RadioInput {field} />
  {/if}

  <!-- Object List -->
  {#if type == "object-list"}
    <ObjectListInput {field} />
  {/if}

  <!-- String List -->
  {#if type == "string-list"}
    <StringListInput {field} />
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

    &__label {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 14px;
    }
  }
</style>
