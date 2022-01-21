<script>
  export let field, onChange;
  let boxes = field.value;
</script>

<div class="checkbox-input">
  {#each boxes as box}
    <div class="checkbox-input__option">
      <input
        class="checkbox-input__option__input"
        id="multi-{box.value}"
        type="checkbox"
        value={box.value}
        checked={box.checked}
        onChange={(e) => onChange(e, boxes)}
        on:click={(e) => (box.checked = !box.checked)}
      />
      <label class="checkbox-input__option__label" for="multi-{box.value}"
        >{box.label}</label
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
