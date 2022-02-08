<script>
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import NonDynamic from "../../../helpers/Form/NonDynamic.svelte";
  import { goto, params } from "@roxi/routify";
  import { getOrganization } from "../../../helpers/Functions/backend.js";
  import { user } from "../../../data/user.js";
  import { onMount } from "svelte";
  import { verifyLoginStatus } from "../../../helpers/Functions/authentication";

  let userData = {};
  let organization = { projects: [] };
  user.subscribe((data) => {
    userData = data;
  });
  console.log("Getting organization data:", $params.organization);

  onMount(async () => {
    const loggedIn = await verifyLoginStatus();
    if (!loggedIn) {
      $goto("/users/login");
    }
    organization = (await getOrganization($params.organization)).organization;
    console.log("Organization:", organization);
  });
</script>

<Navbar />
<div class="organization">
  <Header
    title={organization.name}
    type="subtitle"
    buttons={[
      {
        text: "New User",
        type: "secondary",
        action: "",
      },
      {
        text: "New Project",
        type: "primary",
        action: "",
      },
    ]}
  />
  {#if organization.projects[0] !== undefined}
    <PreviewGrid projects={organization.projects} />
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no projects, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          console.log("New User");
        }}>create a new one</span
      >?
    </p>{/if}
</div>

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";
  .organization {
    @include default-padding;
  }
</style>
