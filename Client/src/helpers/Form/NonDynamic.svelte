<script>
  export let title, fields, onChange;
  import Input from "../Input/Input.svelte";
  import Header from "../../helpers/Header/Header.svelte";

  let inputs = {};
  let editableFields = [...fields];
  $: editableFields.forEach((field) => {
    inputs[field.name.toLowerCase()] = field.value;
  });

  // Make a list of required values and if they are empty, show an error
  $: requiredFields = editableFields.filter((field) => field.required);
</script>

<form class="form">
  {#if title}
    <Header {title} type="subtitle" />
  {/if}
  {#each fields as field}
    <Input
      field={{ name: field.name, value: field.value }}
      required={field.required ? true : false}
      type={field.type !== "breadcrumbs" ? field.type : "text"}
      settings={field.settings}
      onChange={(e, data) => {
        console.log("Data: ", data);
        console.log("Input:", field.name.toLowerCase());
        inputs[field.name.toLowerCase()] = data;
        editableFields[editableFields.indexOf(field)].value = data;
        let allRequiredFieldsFilled = true;
        requiredFields.forEach((requiredField) => {
          if (!requiredField.value > 0) {
            allRequiredFieldsFilled = false;
          }
        });
        console.log("Submittable: ", allRequiredFieldsFilled);
        onChange(e, inputs, allRequiredFieldsFilled);
      }}
    />
  {/each}
</form>
