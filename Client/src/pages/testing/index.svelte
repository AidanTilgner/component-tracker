<script>
  import InfoItem from "../../helpers/Informative/InfoItem/InfoItem.svelte";
  let component = {
    metaData: {
      name: "",
      fileType: "",
      category: "",
      path: "",
      example: "",
      description: ".",
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
    imports: [],
    exports: [],
    functions: [],
    connectedFiles: { parents: [], children: [], helpers: [] },
  };

  setTimeout(() => {
    component = {
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
      imports: [],
      exports: [],
      functions: [],
      connectedFiles: { parents: [], children: [], helpers: [] },
    };
  }, 1000);
</script>

<div class="testing">
  {#each Object.keys(component.metaData) as key}
    <InfoItem title={key} value={component[key]} />
  {/each}
</div>

<style type="text/scss">
  .testing {
    width: 50%;
    height: 200px;
    margin: 24px auto;
  }
</style>
