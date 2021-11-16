<script>
  import Navbar from "../components/Navbar/Navbar.svelte";
  import Header from "../components/Helpers/Header/Header.svelte";
</script>

<Navbar />
<div class="home">
  <Header
    title="Recent Projects"
    type="subtitle"
    buttons={[
      { text: "All Projects", type: "secondary", action: "" },
      { text: "New Project", type: "primary", action: "" },
    ]}
  />
</div>

<style lang="scss">
  .home {
  }
</style>
