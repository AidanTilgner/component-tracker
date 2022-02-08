<script>
  import { verifyLoginStatus } from "../helpers/Functions/authentication";
  import { goto, redirect } from "@roxi/routify";
  import { onMount } from "svelte";

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (!isLoggedIn) {
        $goto("/users/login");
      }
      $redirect("/home");
    } catch (error) {
      console.log("Error in onMount", error);
    }
  });
</script>

Pages/index
