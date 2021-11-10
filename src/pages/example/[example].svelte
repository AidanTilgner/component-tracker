<script>
  import { url } from "@roxi/routify";
  import { params } from "@roxi/routify";
</script>

<h1>I am an example of a dynamic route</h1>
<p>Params: {$params.example}</p>
<a href={$url("../")}>click this link to go back home</a>
