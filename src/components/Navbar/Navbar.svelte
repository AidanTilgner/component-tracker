<script>
  import SearchBar from "../SearchBar/SearchBar.svelte";
  import Profile from "../Profile/Profile.svelte";
</script>

<div class="navbar">
  <p class="navbar__title">Component Tracker</p>
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
    font-family: $font-primary;
    position: sticky;
    top: 0;
    z-index: 1;
    left: 0;
    right: 0;
    box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline-start: 100px;
    padding-inline-end: 100px;

    &__title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    &__items {
      display: flex;
      align-items: center;
    }
  }
</style>
