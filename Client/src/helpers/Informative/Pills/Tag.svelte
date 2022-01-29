<script>
  export let name, type;
  let colors = {
    primary: "#2256f2",
    secondary: "#f2b822",
    success: "#2ecc71",
    danger: "#e74c3c",
    warning: "#f1c40f",
    info: "#3498db",
    light: "#c4c4c4",
    dark: "#34495e",
  };
</script>

<div
  class="tag"
  style={`
    background-color: ${colors[type]}15;
    color: ${colors[type]};
    border-color: ${colors[type]};`}
>
  {name}
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .tag {
    margin: 8px 8px 8px 0;
    padding: 5px 14px;
    border-radius: 99px;
    font-size: 16px;
    font-weight: 600;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
    box-shadow: 0.2px 0.2px 4px 0 rgba($color: #000000, $alpha: 0.25);

    &:hover {
      box-shadow: 0.2px 0.2px 4px 0 rgba($color: #000000, $alpha: 0.5);
    }
  }
</style>
