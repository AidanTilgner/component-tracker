<script>
  import { params } from "@roxi/routify";
  import Navbar from "../../components/Navbar/Navbar.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import fileTree from "../../components/FileTree/FileTree.svelte";
  console.log($params);
  let project = { name: "project", codeName: $params.project };
</script>

<Navbar />
<div class="project">
  <Header
    title="Aidan Tilgner/<span style='font-weight: bold;'>{project.name}</span>"
    type="breadcrumbs"
    buttons={[{ text: "Add", type: "primary", action: "" }]}
  />
  <Header title="Tree" type="subtitle" />
</div>

<style type="text/scss"></style>
