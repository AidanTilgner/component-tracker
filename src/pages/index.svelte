<script>
  import { fly } from "svelte/transition";
  import Title from "../components/Title/Title.svelte";
  let visibile = false;
  setTimeout(() => {
    visibile = true;
  }, 500);
</script>

{#if visibile}
  <main class="main" transition:fly={{ y: 200, duration: 2000 }}>
    <!--Put all your fancy code here-->
    <h1 class="title">
      <Title title="Let's get started" />
    </h1>
  </main>
{/if}

<!-- use lang="sass" for SASS -->
<style lang="scss">
  @import "../styles/index.scss";
</style>
