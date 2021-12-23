<script>
  export let field, onchange;
</script>

<div class="checkbox-input">
  {#each field.options as option}
    <div class="checkbox-input__option">
      <input
        class="checkbox-input__option__input"
        id="multi-{option.value}"
        type="checkbox"
        value={option.value}
        checked={option.checked}
        onchange={(e) => onchange(e)}
        on:click={(e) => (option.checked = !option.checked)}
      />
      <label class="checkbox-input__option__label" for="multi-{option.value}"
        >{option.label}</label
      >
    </div>
  {/each}
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";
  .checkbox-input {
    width: 50%;

    &__option {
      display: flex;
      align-items: center;
      height: 36px;

      &__label {
        margin: 0;
        padding-bottom: 10px;
        margin-left: 14px;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
</style>
