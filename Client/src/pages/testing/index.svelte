<script>
  import Input from "../../helpers/Input/Input.svelte";
  import Form from "../../helpers/Form/Form.svelte";

  let testing = 1;
</script>

<div class="testing">
  {#if testing === 1}
    <Form
      data={{
        metaData: {
          fileName: "",
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
          tags: [{ name: "" }],
        },
        imports: [
          {
            name: "",
            from: "",
            type: "",
            description: "",
            notes: "",
          },
        ],
        exports: [],
        functions: [
          {
            name: "",
            description: "",
            ExternalLocation: "",
            parameters: "",
            returns: "",
            notes: "",
          },
        ],
        connectedFiles: {
          parents: [],
          children: [],
          helpers: [],
        },
      }}
      onChange={(e, data) => {
        console.log("Usable Data: ", data);
      }}
    />
  {/if}
  {#if testing === 2}
    <Input
      type="array-list"
      field={{
        value: [
          { test: "test1", test2: "test2" },
          { test: "testing", test2: "test2" },
        ],
        name: "Testing",
      }}
      onChange={(e, data) => {
        console.log("Data: ", data);
      }}
    />
  {/if}
</div>

<style type="text/scss">
  .testing {
    width: 50%;
    height: 200px;
    margin: 24px auto;
  }
</style>
