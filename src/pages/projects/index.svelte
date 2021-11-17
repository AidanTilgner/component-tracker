<script>
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../components/Helpers/Header/Header.svelte";
  import PreviewGrid from "../../components/PreviewGrid/PreviewGrid.svelte";
</script>

<Navbar />
<Header
  title="Projects"
  type="subtitle"
  buttons={[{ text: "New Project", type: "primary", action: "" }]}
/>
<PreviewGrid />
