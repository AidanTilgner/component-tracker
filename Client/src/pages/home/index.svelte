<script>
  // Helpers
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import {
    getUserFromLogin,
    addProject,
    getUserProjects,
    getUserOrganizations,
  } from "../../helpers/Functions/backend.js";
  import { verifyLoginStatus } from "../../helpers/Functions/authentication";

  // Components
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Footer from "../../components/Footer/Footer.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import PreviewGrid from "../../components/PreviewGrid/PreviewGrid.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import Form from "../../helpers/Form/Form.svelte";
  import NonDynamic from "../../helpers/Form/NonDynamic.svelte";
  import MiniCard from "../../helpers/Informative/Cards/MiniCard.svelte";
  import AlertBanner from "../../helpers/Informative/AlertBanner/AlertBanner.svelte";

  // Stores
  import { user } from "../../data/user";

  // Getting user from API
  let userData = {};
  let projects = [];
  let organizations = [];
  user.subscribe((user) => {
    userData = user;
  });

  onMount(async () => {
    try {
      const isLoggedIn = await verifyLoginStatus();
      if (!isLoggedIn) {
        $goto("/users/login");
      }
      projects = (await getUserProjects(userData.user_id)).projects.slice(0, 3);
      organizations = (await getUserOrganizations(userData.user_id))
        .organizations;
      user.update((user) => {
        user.projects = projects;
        user.organizations = organizations;
        return user;
      });
    } catch (err) {
      console.log("Error in onMount: ", err);
    }
  });

  let newProjectModal = false;

  let projectData = {};

  let alertBanner = {
    showing: false,
    message: "",
    type: "",
    timeout: 3000,
  };
</script>

<Navbar />
<div class="home" data-testid="home">
  <Header
    title="Recent Projects"
    type="subtitle"
    buttons={[
      {
        text: "All Projects",
        type: "secondary",
        action: () => $goto("/projects"),
      },
    ]}
  />
  {#if projects[0] !== undefined}
    <PreviewGrid {projects} />
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no projects, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          $goto("/projects");
        }}>create a new one</span
      >?
    </p>
  {/if}
  <Header
    title="Teams"
    type="subtitle"
    buttons={[
      {
        text: "All Teams",
        type: "secondary",
        action: () => {
          $goto("/organizations");
        },
      },
    ]}
  />
  {#if organizations[0] !== undefined}
    <div class="organizations">
      {#each organizations as organization}
        <div class="organizations__item">
          <MiniCard
            title={organization.name}
            endpoint={`/organizations/${organization.organization_id}`}
          />
        </div>
      {/each}
    </div>
  {:else}
    <p
      style="text-align: center;color: rgba(0, 0, 0, .65);margin: 14px 0;font-family: 'Quicksand', sans-serif;font-weight: 500;"
    >
      You have no teams, would you like to <span
        style="color: #2256f2;text-decoration: underline;cursor: pointer;font-weight: 600;"
        on:click={() => {
          $goto("/organizations");
        }}>create a new one</span
      >?
    </p>
  {/if}
</div>
<Footer />

<style type="text/scss">
  @import "../../styles/partials/variables.scss";
  @import "../../styles/partials/typography.scss";
  @import "../../styles/partials/mixins.scss";

  .home {
    @include default-padding;
  }

  .organizations {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      margin-bottom: 36px;
      width: 48%;
    }
  }
</style>
