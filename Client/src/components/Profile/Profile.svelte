<script>
  import Icon from "../../helpers/Icon/Icon.svelte";
  import { user } from "../../data/user";
  import { url, goto } from "@roxi/routify";
  export let initials = "AT";

  // TODO: Work out how to make this dynamic
  // TODO: Make onclick functionality to open user profile
</script>

<div
  on:click={(e) => {
    $goto("/profile");
  }}
  class="profile"
>
  <p class="profile__initials">{initials}</p>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .profile {
    height: 45px;
    width: 45px;
    background-color: $color-orange;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.25);
    cursor: pointer;

    &:hover {
      box-shadow: 0.2px 0.2px 10px 0 rgba($color: #000000, $alpha: 0.5);
    }

    &__initials {
      color: white;
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>
