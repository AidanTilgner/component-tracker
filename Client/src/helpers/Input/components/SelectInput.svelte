<script>
  export let field, onChange;
</script>

<div class="select-input">
  <select
    class="select-input__input"
    on:change={(e) => onChange(e, e.target.value)}
  >
    {#each field.options as option}
      <option
        value={option.value}
        selected={option.value == field.value ? true : false}
        >{option.label}</option
      >
    {/each}
  </select>
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";
  .select-input {
    width: 50%;

    &__input {
      width: 100%;
      height: 45px;
      border: 2px solid #c4c4c4;
      border-radius: 5px;
      font-size: 18px;
      background-color: #fff;
      box-shadow: inset 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
      color: #333;
      outline: none;

      &:focus {
        border-color: $color-primary;
      }
    }
  }
</style>
