<script>
  import SearchBar from "../SearchBar/SearchBar.svelte";
  import Profile from "../Profile/Profile.svelte";
  import { goto, url } from "@roxi/routify";

  // TODO: Make this component dynamic based on user data
</script>

<div class="navbar" data-testid="navbar">
  <p
    class="navbar__title"
    on:click={(e) => {
      $goto($url("/"));
    }}
  >
    Component Tracker
  </p>
  <div class="navbar__items">
    <SearchBar />
    <Profile initials="AT" />
  </div>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .navbar {
    @include default-padding;
    background-color: white;
    font-family: $font-primary;
    position: sticky;
    top: 0;
    z-index: 5;
    left: 0;
    right: 0;
    box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        color: $color-primary;
      }
    }

    &__items {
      display: flex;
      align-items: center;
    }
  }
</style>
