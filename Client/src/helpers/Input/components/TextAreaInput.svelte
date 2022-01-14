<script>
  export let field, onChange;
</script>

<div class="textarea-input">
  <textarea
    on:change={(e) => onChange(e, e.target.value)}
    type="text"
    class="textarea-input__input"
    value={field.value}
  />
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .textarea-input {
    width: 100%;

    &__input {
      background-color: white;
      border: 1.5px solid #c4c4c4;
      border-radius: 5px;
      box-shadow: inset 0.2px 0.2px 5px 0 rgba($color: #000000, $alpha: 0.25);
      padding-inline-start: 14px;
      width: 100%;
      height: 45px;
      scrollbar-width: none;
      font-size: 18px;
    }
  }
</style>
