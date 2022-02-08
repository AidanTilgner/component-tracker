<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import MiniCard from "../../helpers/Informative/Cards/MiniCard.svelte";
  import { user } from "../../data/user.js";
  import { onMount } from "svelte";
  import { getUserOrganizations } from "../../helpers/Functions/backend.js";

  let userData = {};
  let organizations = [];
  user.subscribe((data) => {
    userData = data;
  });

  onMount(async () => {
    organizations = await getUserOrganizations(userData.user_id);
    console.log(organizations);
  });
</script>

<Navbar />

<div class="organizations">
  <Header
    title="Your Organizations"
    type="subtitle"
    buttons={[
      {
        text: "Add",
        type: "primary",
        action: () => {
          console.log("Add Organization");
        },
      },
    ]}
  />
  <div class="organizations__list">
    {#each organizations as organization}
      <div class="organizations__item">
        <MiniCard
          title={organization.name}
          endpoint={`/organizations/${organization.organization_id}`}
        />
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";
  .organizations {
    @include default-padding;
    background-color: #f8f8f8;

    &__list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__item {
      margin-bottom: 36px;
      width: 48%;
    }
  }
</style>
