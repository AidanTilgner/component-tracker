<script>
  import Icon from "../../helpers/Icon/Icon.svelte";
  export let initials = "AT";

  // TODO: Work out how to make this dynamic
</script>

<div class="profile">
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

    &__initials {
      color: white;
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>
