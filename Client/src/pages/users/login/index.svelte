<script>
  import { url, goto } from "@roxi/routify";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import { getUser, login } from "../../../helpers/Functions/backend.js";
  import { user, tokens } from "../../../data/user";
  import { verifyLoginStatus } from "../../../helpers/Functions/authentication.js";
  import {
    writeToLocalStorage,
    logLocalStorage,
    writeToSessionStorage,
    readFromLocalStorage,
    readFromSessionStorage,
  } from "../../../helpers/Functions/local.js";

  let verified = false;

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (isLoggedIn) {
        $goto("/home");
      }
    } catch (error) {
      console.log("Error in onMount: ", error);
    }
  });

  tokens.subscribe((tokens) => {
    console.log("Tokens: ", tokens);
  });

  user.subscribe((user) => {
    console.log("User: ", user);
  });

  const submitLogin = async (e) => {
    let data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    const response = await login(data.username, data.password);
    console.log(response);
    writeToLocalStorage("refreshToken", response.tokens.refresh);
    writeToSessionStorage("accessToken", response.tokens.access);
    writeToLocalStorage("user", JSON.stringify(response.user));
    logLocalStorage();
    tokens.set(response.tokens);
    user.set(response.user);
    console.log(
      "Tokens: ",
      readFromLocalStorage("refreshToken"),
      readFromSessionStorage("accessToken")
    );
    console.log("User: ", JSON.parse(readFromLocalStorage("user")));
    $goto("/home");
  };
</script>

<div class="login">
  <div class="login__modal">
    <h3 class="login__title">Login</h3>
    <form
      class="login__form"
      on:submit={(e) => {
        e.preventDefault();
        submitLogin(e);
      }}
    >
      <label class="login__label" for="username"> Username: </label>
      <input
        name="username"
        class="login__input"
        id="username"
        type="text"
        value=""
      />
      <label class="login__label" for="password"> Password: </label>
      <input
        name="password"
        class="login__input"
        id="password"
        type="password"
        value=""
      />
      <div class="login__buttons">
        <a href={$url("../signup")} class="login__button-secondary"
          >Not a User? Sign Up</a
        >
        <button class="login__button-primary">Login</button>
      </div>
    </form>
  </div>
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: $font-primary;
    background-color: #f8f8f8;
    height: 100vh;

    &__modal {
      width: 40vw;
      box-shadow: 0.2px 0.2px 10px 0 rgba(0, 0, 0, 0.25);
      background-color: white;
      border-radius: 8px;
    }

    &__title {
      font-size: 36px;
      border-bottom: 1px solid #c4c4c4;
      padding: 24px 36px;
      margin: 0;
      font-weight: 500;
    }

    &__form {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__label {
      font-size: 24px;
      margin: 0;
      margin-bottom: 8px;
      margin-left: 36px;
      font-weight: 500;
      margin-top: 36px;
    }

    &__input {
      background-color: white;
      height: 45px;
      border: 1.5px solid #c4c4c4;
      border-radius: 5px;
      box-shadow: inset 0.2px 0.2px 2px 0 rgba($color: #000000, $alpha: 0.25);
      padding-inline-start: 14px;
      margin: 0 36px;

      &:focus {
        outline: none;
        border: 2px solid $color-primary;
      }
    }

    &__buttons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 36px;
    }

    &__button {
      &-primary {
        @include button;
        @include button-primary;
        margin: 0;
      }

      &-secondary {
        @include button-text;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 14px;
      }
    }
  }
</style>
