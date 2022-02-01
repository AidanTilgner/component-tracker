<script>
  import { verifyLoginStatus } from "../helpers/Functions/authentication";
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";

  onMount(async () => {
    const isLoggedIn = await verifyLoginStatus();
    if (!isLoggedIn) {
      $goto("/users/login");
    }
  });
</script>

Pages/index
