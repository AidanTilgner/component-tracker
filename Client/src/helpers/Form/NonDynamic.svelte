<script>
  export let title, fields, onChange;
  import Input from "../Input/Input.svelte";
  import Header from "../../helpers/Header/Header.svelte";

  let inputs = {};
  fields.forEach((field) => {
    console.log("Field: ", field);
    inputs[field.name.toLowerCase()] = field.value;
  });
  console.log("Inputs: ", inputs);
</script>

<form class="form">
  {#if title}
    <Header {title} type="subtitle" />
  {/if}
  {#each fields as field}
    <Input
      field={{ name: field.name, value: field.value, required: field.required }}
      type={field.type}
      onChange={(e, data) => {
        inputs[field.name.toLowerCase()] = data;
        onChange(e, inputs);
      }}
    />
  {/each}
</form>
