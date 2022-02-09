<script>
  import { url, goto } from "@roxi/routify";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import {
    getUser,
    login,
    signUp,
  } from "../../../helpers/Functions/backend.js";
  import { user, tokens } from "../../../data/user";
  import { verifyLoginStatus } from "../../../helpers/Functions/authentication.js";
  import {
    writeToLocalStorage,
    logLocalStorage,
    writeToSessionStorage,
    readFromLocalStorage,
    readFromSessionStorage,
  } from "../../../helpers/Functions/local.js";
  import AlertBanner from "../../../helpers/Informative/AlertBanner/AlertBanner.svelte";

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

  const handleSignUpSuccess = async (res) => {
    writeToLocalStorage("refreshToken", res.tokens.refresh);
    writeToSessionStorage("accessToken", res.tokens.access);
    writeToLocalStorage("user", JSON.stringify(res.user));
    logLocalStorage();
    tokens.set(res.tokens);
    user.set(res.user);
    console.log(
      "Tokens: ",
      readFromLocalStorage("refreshToken"),
      readFromSessionStorage("accessToken")
    );
    console.log("User: ", JSON.parse(readFromLocalStorage("user")));
    $goto("/home");
  };

  let dispatchBanner = {
    showing: "",
    type: "",
    message: "",
    timeout: 3000,
  };

  const submitSignup = async (e) => {
    try {
      let data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      const response = await signUp(data.username, data.email, data.password);
      console.log("Response: ", response);
      if (response.error) {
        console.log("Displaying error");
        dispatchBanner.showing = true;
        dispatchBanner.type = "error";
        dispatchBanner.message = response.error;
        return;
      }
      handleSignUpSuccess({ user: response.user, tokens: response.tokens });
    } catch (error) {
      console.log("Error in submitSignup: ", error);
    }
  };
</script>

<AlertBanner
  showing={dispatchBanner.showing}
  message={dispatchBanner.message}
  type={dispatchBanner.type}
  timeout={dispatchBanner.timeout}
/>
<div class="signup">
  <div class="signup__modal">
    <h3 class="signup__title">New User</h3>
    <form
      class="signup__form"
      on:submit={(e) => {
        e.preventDefault();
        submitSignup(e);
      }}
    >
      <label class="signup__label" for="username"> Username: </label>
      <input
        name="username"
        class="signup__input"
        id="username"
        type="text"
        value=""
      />
      <label class="signup__label" for="email"> Email: </label>
      <input
        name="email"
        class="signup__input"
        id="email"
        type="text"
        value=""
      />
      <label class="signup__label" for="password"> Password: </label>
      <input
        name="password"
        class="signup__input"
        id="password"
        type="password"
        value=""
      />
      <div class="signup__buttons">
        <a href={$url("../login")} class="signup__button-secondary"
          >Have an Account?</a
        >
        <button class="signup__button-primary">Register</button>
      </div>
    </form>
  </div>
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";

  .signup {
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
      justify-content: space-between;
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
