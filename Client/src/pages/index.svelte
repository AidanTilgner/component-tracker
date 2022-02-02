<script>
  import { verifyLoginStatus } from "../helpers/Functions/authentication";
  import { goto, redirect } from "@roxi/routify";
  import { onMount } from "svelte";

  onMount(async () => {
    const isLoggedIn = await verifyLoginStatus();
    if (!isLoggedIn) {
      $goto("/users/login");
    }
    $redirect("/home");
  });
</script>

Pages/index
