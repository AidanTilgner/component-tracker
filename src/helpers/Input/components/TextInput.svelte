<script>
  export let field;
</script>

<div class="text-input">
  <input type="text" class="text-input__input" />
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
