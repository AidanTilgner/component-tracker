<script>
  import InfoItem from "../../helpers/Informative/InfoItem/InfoItem.svelte";
  import { onMount } from "svelte";
  import { getComponent } from "../../helpers/Functions/backend";
  let component = {
    metaData: {
      name: "",
      fileType: "",
      category: "",
      path: "",
      example: "",
      description: "",
      props: [
        {
          name: "",
          description: "",
          type: "",
        },
      ],
      state: [
        {
          name: "",
          description: "",
          type: "",
        },
      ],
      tags: [{ name: "", type: "" }],
    },
  };

  $: metaData = Object.keys(component.metaData);
  $: metaDataObject = component.metaData;

  // onMount(async () => {
  //   component = await getComponent(
  //     "rco8r-hv41p-axi5l-ocbq9",
  //     "src/child1/Child1.js"
  //   );
  // });

  onMount(async () => {
    setTimeout(() => {
      component = {
        creator: { name: "aidan.tilgner", id: "1284-341f-214341-d134" },
        metaData: {
          name: "Child-1",
          fileType: "JavaScript",
          category: "Views",
          path: "src/child1/Child1.js",
          example: "https://www.aidantilgner.dev",
          description: "This is a new description.",
          props: [
            {
              name: "routeProps",
              description:
                "This provides information about the given component for routing",
              type: "Object",
            },
            {
              name: "routeProps",
              description:
                "This provides information about the given component for routing",
              type: "Object",
            },
          ],
          state: [
            {
              name: "data",
              description: "This is a new description",
              type: "Object",
            },
          ],
          tags: [{ name: "bugs", type: "danger" }],
        },
        imports: [],
        exports: [],
        functions: [],
        connectedFiles: { parents: [], children: [], helpers: [] },
      };
    }, 1000);
  });
</script>

<div class="testing">
  {#each metaData as key}
    <InfoItem title={key} value={component.metaData[key]} />
  {/each}
</div>

<style type="text/scss">
  .testing {
    width: 50%;
    height: 200px;
    margin: 24px auto;
  }
</style>
