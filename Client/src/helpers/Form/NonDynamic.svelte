<script>
  export let title, fields, onChange;
  import Input from "../Input/Input.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";

  console.log("Fields: ", fields);
  let inputs = {};
  $: fields.forEach((field) => {
    inputs[field.name.toLowerCase()] = field.value;
  });

  // Make a list of required values and if they are empty, show an error
  $: requiredFields = fields.filter((field) => field.required);
</script>

<form class="form">
  {#if title}
    <Header {title} type="subtitle" />
  {/if}
  {#each fields as field}
    <Input
      field={{ name: field.name, value: field.value }}
      required={field.required ? true : false}
      type={field.type}
      settings={field.settings}
      onChange={(e, data) => {
        inputs[field.name.toLowerCase()] = data;
        // Check that all required fields are not "" or falsey
        let allRequiredFieldsFilled = true;
        requiredFields.forEach((requiredField) => {
          if (
            !inputs[requiredField.name.toLowerCase()] ||
            inputs[requiredField.name.toLowerCase()] === ""
          ) {
            allRequiredFieldsFilled = false;
          }
        });
        console.log("allRequiredFieldsFilled", allRequiredFieldsFilled);
        onChange(e, inputs, allRequiredFieldsFilled);
      }}
    />
  {/each}
</form>
