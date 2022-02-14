<script>
  export let action;
  import { user } from "../../data/user.js";
  import { searchUsers } from "../../helpers/Functions/backend.js";
  import Icon from "../../helpers/Icon/Icon.svelte";
  let userData;
  user.subscribe((data) => {
    userData = data;
  });
  let searchResults = [];
  let username = "";
  let selected = {
    user_id: "",
    username: "",
  };
</script>

<div class="user-search">
  <label for="username-input" class="user-search__label"
    >Type Their Username:</label
  >
  <input
    type="text"
    id="username-input"
    value={username}
    on:input={(e) => {
      console.log("input", e.target.value);
      username = e.target.value;
      (async () => {
        const response = await searchUsers(username);
        searchResults = response.users;
        console.log("searchResults", searchResults);
      })();
    }}
    class="user-search__input"
  />
  {#if username.length > 0 && searchResults.length > 0}
    <div class="user-search__results">
      {#each searchResults as result, idx}
        <p
          class="user-search__result"
          on:click={() => {
            selected = {
              user_id: result.user_id,
              username: result.username,
            };
          }}
          tabindex={idx}
        >
          {result.username}
        </p>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .user-search {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: $font-primary;
    position: relative;

    &__label {
      margin-bottom: 4px;
      font-size: 20px;
      font-weight: 500;
      width: 208px;
    }

    &__input {
      border: none;
      border-bottom: 2px solid $color-primary;
      font-size: 18px;
      background-color: #f8f8f8;
      width: 208px;
      margin: 0;

      &:focus {
        outline: none;
      }
    }

    &__results {
      max-height: 160px;
      width: 208px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: absolute;
      top: 80px;
      background-color: white;
      border-radius: 2px;
      z-index: 10;
      overflow-y: scroll;
      scrollbar-width: none;
      box-shadow: 0.2px 0.2px 5px 0 rgba($color: #000000, $alpha: 0.25);
      padding: 0;

      @keyframes on-open {
        0% {
          opacity: 0;
        }
        50% {
          height: 0px;
        }
        80% {
          height: 56px;
        }
        100% {
          opacity: 1;
        }
      }
      animation-name: on-open;
      animation-duration: 0.2s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }

    &__result {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      cursor: pointer;
      width: 100%;
      text-align: center;
      padding: 14px 0;
      border-bottom: 1px solid rgba($color: $color-black, $alpha: 0.25);

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
    }
  }
</style>
