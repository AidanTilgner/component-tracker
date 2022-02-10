<script>
  import Navbar from "../../../components/Navbar/Navbar.svelte";
  import Header from "../../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../../helpers/Modal/Modal.svelte";
  import NonDynamic from "../../../helpers/Form/NonDynamic.svelte";
  import MiniCard from "../../../helpers/Informative/Cards/MiniCard.svelte";
  import { goto, params } from "@roxi/routify";
  import { getOrganization } from "../../../helpers/Functions/backend.js";
  import { user } from "../../../data/user.js";
  import { onMount } from "svelte";
  import { verifyLoginStatus } from "../../../helpers/Functions/authentication";
  import Footer from "../../../components/Footer/Footer.svelte";

  let userData = {};
  let organization = { projects: [], users: [] };
  user.subscribe((data) => {
    userData = data;
  });

  onMount(async () => {
    const loggedIn = await verifyLoginStatus();
    if (!loggedIn) {
      $goto("/users/login");
    }
    organization = (await getOrganization($params.organization)).organization;
  });
</script>

<Navbar />
<div class="organization">
  <Header
    title={organization.name}
    type="title"
    buttons={[
      {
        text: "Edit",
        type: "secondary",
        action: "",
      },
      {
        text: "Delete",
        type: "tertiary",
        action: "",
      },
    ]}
  />
  <Header
    title="Projects"
    type="subtitle"
    buttons={[
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
    </p>
  {/if}
  <Header
    title="Users"
    type="subtitle"
    buttons={[
      {
        text: "New User",
        type: "primary",
        action: "",
      },
    ]}
  />
  {#if organization.users[0] !== undefined}
    <div class="organization__users">
      {#each organization.users as user}
        <div class="organization__user">
          <MiniCard
            title={user.username}
            subtitle={user.email}
            buttons={[
              {
                text: "Edit",
                type: "secondary",
                action: "",
              },
              {
                text: "Delete",
                type: "tertiary",
                action: "",
              },
            ]}
          />
        </div>
      {/each}
    </div>
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no members, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          console.log("New User");
        }}>create a new one</span
      >?
    </p>
  {/if}
</div>
<Footer />

<style lang="scss">
  @import "../../../styles/partials/variables";
  @import "../../../styles/partials/typography";
  @import "../../../styles/partials/mixins";
  .organization {
    @include default-padding;

    &__users {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__user {
      width: 48%;
      margin-bottom: 36px;
    }
  }
</style>
