<script>
  export let title, fields;
  import Input from "../Input/Input.svelte";
  import Header from "../../helpers/Header/Header.svelte";
</script>

<form class="form">
  {#if title}
    <Header {title} type="subtitle" />
  {/if}
  {#each fields as field}
    <Input
      field={{ name: field.name, value: field.value, required: field.required }}
      type={field.type}
    />
  {/each}
</form>
