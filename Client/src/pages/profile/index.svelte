<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import { user } from "../../data/user";
  import { logout } from "../../helpers/Functions/backend";
  import { onMount } from "svelte";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication";
  import { goto } from "@roxi/routify";
  let userData;
  user.subscribe((data) => {
    userData = data;
  });
  console.log("User:", userData);

  onMount(async () => {
    const loggedIn = await verifyLoginStatus();
    if (!loggedIn) {
      $goto("/users/login");
    }
  });
</script>

<Navbar />
<div class="profile">
  <Header
    title="Profile"
    type="subtitle"
    buttons={[
      {
        text: "Logout",
        type: "tertiary",
        action: (e) => {
          logout();
          $goto("/users/login");
        },
      },
    ]}
  />
  <NonDynamic
    fields={[
      {
        name: "Username",
        value: userData.username,
        required: true,
        type: "text",
      },
    ]}
  />
</div>

<style>
  .profile {
    padding-inline-start: 100px;
    padding-inline-end: 100px;
  }
</style>
