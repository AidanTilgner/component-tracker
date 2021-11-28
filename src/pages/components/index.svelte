<script>
  import { redirect, params } from "@roxi/routify";
  $redirect("/projects/:project", { project: $params.project });
</script>
