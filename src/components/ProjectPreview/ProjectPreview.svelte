<script>
  import { url, goto } from "@roxi/routify";
  import Icon from "../Helpers/Icon/Icon.svelte";
  export let title;
  export let endpoint;
  export let edited;
  export let framework;
</script>

<div
  class="preview"
  style="background-color: {framework === 'react'
    ? '#61DBFB'
    : framework === 'svelte'
    ? '#FF3E00'
    : ''};"
  on:click={(e) => {
    e.stopPropagation();
    console.log("going to new link");
    $goto(`/projects/:project`, { project: endpoint });
  }}
>
  <div class="preview__framework-icon">
    <Icon
      name={framework === "react"
        ? "react-icon"
        : framework === "svelte"
        ? "svelte-icon"
        : framework === "vue"
        ? "vue-icon"
        : framework === "angular"
        ? "angular-icon"
        : "unknown"}
      width="100"
      height="100"
    />
  </div>
  <div class="preview__banner">
    <p class="preview__title">{title}</p>
    <p class="preview__edited">
      edited <span style="font-weight: 600;">{edited}</span>
    </p>
    <div
      class="preview__options"
      on:click={(e) => {
        e.stopPropagation();
        console.log("clicked options");
      }}
    >
      <Icon name="three-dots" height="9" width="21" />
    </div>
  </div>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/mixins";
  @import "../../styles/partials/typography";

  .preview {
    height: 250px;
    width: 250px;
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
    font-family: $font-primary;
    cursor: pointer;

    &__title {
      font-size: 24px;
      font-weight: 600;
      position: absolute;
      top: 10px;
      left: 18px;
      margin: 0;

      &:hover {
        cursor: pointer;
        color: $color-primary;
        text-decoration: underline;
      }
    }

    &__edited {
      font-size: 14px;
      font-weight: 400;
      position: absolute;
      bottom: 19px;
      left: 18px;
      margin: 0;
    }

    &__banner {
      background-color: white;
      position: absolute;
      height: 85px;
      width: 100%;
      bottom: 0;
      box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
      //pointer should be default
      cursor: initial;
    }

    &__options {
      position: absolute;
      top: 10px;
      right: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      border-radius: 5px;

      &:hover {
        box-shadow: 0.2px 0.2px 2.5px 0 rgba($color: #000000, $alpha: 0.25);
        cursor: pointer;
      }
    }

    &__framework-icon {
      margin-top: 32px;
      display: flex;
      justify-content: center;
    }
  }
</style>
