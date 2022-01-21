<script>
  export let title, value, type;

  import {
    formatBreadcrumbs,
    formatLink,
    formatList,
  } from "../../Functions/formatting.js";

  if (type === "breadcrumbs") {
    value = formatBreadcrumbs(value);
  }

  if (type === "link") {
    value = formatLink(value);
  }

  if (type === "list") {
    value = formatList(value);
  }
</script>

<div
  class="info-item"
  style={`display: ${
    type === "normal" ||
    type === "breadcrumbs" ||
    type === "link" ||
    type === "list"
      ? "flex"
      : ""
  }`}
>
  <p class="info-item__title">{title + ": "}</p>
  <p
    class="info-item__value"
    style={`color: ${
      type === "breadcrumbs" || type === "link" || type === "list"
        ? "#2256f2"
        : ""
    }; margin: ${type === "paragraph" && "14px 0 0 0"}`}
  >
    {@html value}
  </p>
</div>

<style type="text/scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .info-item {
    font-family: $font-primary;
    margin-bottom: 24px;

    &__title {
      font-size: 24px;
      font-weight: 600;
      color: black;
      margin: 0;
      margin-right: 14px;
    }

    &__value {
      font-size: 24px;
      font-weight: 400;
      margin: 0;
    }
  }
</style>
