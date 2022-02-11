<script>
  export let field, onChange, required;
  let requiredAlert = false;
</script>

<div class="text-input">
  <input
    on:change={(e) => {
      onChange(e, e.target.value);
      console.log("onChange", e, e.target.value);
      if (required && e.target.value === "") {
        console.log("requiredAlert", requiredAlert);
        requiredAlert = true;
        return;
      }
      requiredAlert = false;
    }}
    type="text"
    class="text-input__input"
    value={field.value}
    style={`border-color: ${requiredAlert && "#a64128"}`}
  />
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .text-input {
    width: 50%;

    &__input {
      background-color: white;
      height: 45px;
      border: 1.5px solid #c4c4c4;
      border-radius: 5px;
      box-shadow: inset 0.2px 0.2px 5px 0 rgba($color: #000000, $alpha: 0.25);
      padding-inline-start: 14px;
      width: 100%;
    }
  }
</style>
