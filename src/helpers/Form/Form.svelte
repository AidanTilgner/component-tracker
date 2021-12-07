<script>
  export let data, onSubmit;

  import Input from "../Input/Input.svelte";

  let formatKey = (key) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
      return str.toUpperCase();
    });
  };

  let inferTypeFromValue = (value) => {
    // This function will take a value and return a type based on the value given
    console.log("Value: ", typeof value);
    switch (typeof value) {
      case "string":
        return "text";
      case "number":
        return "text";
      case "boolean":
        return "radio";
      case "object":
        // If it's an array, we need a list
        if (Array.isArray(value)) {
          // If the array is of object, we need an object list
          // If it's of strings, we need a string list
          if (value[0] && typeof value[0] === "object") {
            return "object-list";
          } else {
            return "string-list";
          }
        }

      default:
        return "text";
    }
  };
</script>

<form class="form">
  {#each Object.keys(data) as key}
    <Input
      type={inferTypeFromValue(data[key])}
      field={{
        id: key + "-" + Math.random().toString(36).substr(2, 5),
        name: formatKey(key),
      }}
    />
  {/each}
</form>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";
</style>
