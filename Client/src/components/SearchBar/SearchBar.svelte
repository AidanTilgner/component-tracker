<script>
  import Icon from "../../helpers/Icon/Icon.svelte";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";
  import { url } from "@roxi/routify";
  import { user } from "../../data/user.js";
  import { onMount } from "svelte";
  import {
    getUserProjects,
    getUserOrganizations,
  } from "../../helpers/Functions/backend.js";
  let userData;
  user.subscribe((data) => {
    userData = data;
  });
  let projects = [];
  let organizations = [];
  let components = [];

  let alertBanner = {
    message: "",
    type: "error",
    showing: false,
  };

  let searchableMaterials = [];
  let searchResults = [];

  onMount(async () => {
    projects = (await getUserProjects(userData.user_id)).projects;
    organizations = (await getUserOrganizations(userData.user_id))
      .organizations;

    for (let i = 0; i < projects.length; i++) {
      searchableMaterials = [
        ...searchableMaterials,
        {
          name: projects[i].name,
          type: "project",
          endpoint: "/projects/" + projects[i].project_id,
        },
      ];
    }

    for (let i = 0; i < organizations.length; i++) {
      searchableMaterials = [
        ...searchableMaterials,
        {
          name: organizations[i].name,
          type: "organization",
          endpoint: "/organizations/" + organizations[i].organization_id,
        },
      ];
    }
  });

  $: console.log("searchableMaterials", searchableMaterials);

  const onInput = (value) => {
    const valueCharacters = value.toLowerCase().split("");
    if (!(value.length > 0)) {
      searchResults = [];
      return;
    }
    // For each searchable material, see how many characters match the search
    // then each search material will have a score based on how many characters
    // match. Then order the search materials by score.
    for (let i = 0; i < searchableMaterials.length; i++) {
      let score = 0;
      for (let j = 0; j < valueCharacters.length; j++) {
        if (
          searchableMaterials[i].name.toLowerCase().includes(valueCharacters[j])
        ) {
          score++;
        }
      }
      if (score > 0) {
        // check if the search material is already in the search results
        let found = false;
        for (let k = 0; k < searchResults.length; k++) {
          if (searchResults[k].name === searchableMaterials[i].name) {
            found = true;
          }
        }
        if (!found) {
          searchResults.push({
            name: searchableMaterials[i].name,
            type: searchableMaterials[i].type,
            endpoint: searchableMaterials[i].endpoint,
            score: score,
          });
        }
      }
    }
    searchResults.sort((a, b) => {
      return b.score - a.score;
    });
    searchResults = searchResults;
    console.log("Search Results: ", searchResults);
  };
</script>

<AlertBanner
  showing={alertBanner.showing}
  type={alertBanner.type}
  message={alertBanner.message}
/>
<div class="search">
  <input
    type="text"
    class="search__input"
    placeholder="search everything..."
    on:input={(e) => {
      onInput(e.target.value);
    }}
  />
  <div class="search__icon">
    <Icon name="search" height="20" width="20" color={"#2256f2"} />
  </div>
  <div class="search__results">
    {#each searchResults as result}
      <a href={$url(result.endpoint)} class="search__result">
        <div class="search__result__name">{result.name}</div>
      </a>
    {/each}
  </div>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .search {
    width: 336px;
    height: 36px;
    position: relative;
    border-radius: 8px;
    box-shadow: 0.2px 0.2px 7px 0 rgba($color: #000000, $alpha: 0.25);
    box-sizing: border-box;
    margin: 0 24px;

    &__input {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      border: none;
      padding-left: 24px;
      font-weight: 500;
      height: 100%;
      border-radius: inherit;

      &:focus {
        outline: none;
        padding-left: calc(24px - 1.5px);
        border: 1.5px solid $color-primary;
        color: $color-primary;
      }
    }

    &__icon {
      position: absolute;
      top: 0;
      right: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
    }

    &__results {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      z-index: 2000;
    }

    &__result {
      border-bottom: 1px solid lightgrey;
      background-color: #ffffff;
      padding: 8px 24px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
    }

    &__result__name {
      font-size: 14px;
      text-decoration: none;
      color: $color-primary;
    }
  }
</style>
