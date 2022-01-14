<script>
  import Input from "../../helpers/Input/Input.svelte";
  import Form from "../../helpers/Form/Form.svelte";

  let testing = 2;
</script>

<div class="testing">
  {#if testing === 1}
    <Form
      data={{
        metaData: {
          fileName: "helper",
          fileType: "JavaScript",
          category: "Views",
          path: "src/helpers/helper.js",
          example: "https://www.aidantilgner.dev",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat orci nulla pellentesque dignissim enim sit. Sapien pellentesque habitant morbi tristique senectus et netus. Nibh venenatis cras sed felis eget velit. Nibh cras pulvinar mattis nunc sed blandit. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. ",
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
              description: "This is the data of the child-1",
              type: "Object",
            },
          ],
          tags: ["Refactor", "Deprecated", "Bugs"],
        },
        imports: [
          {
            name: "React, { useState, UseEffect }",
            from: "react",
            type: "dependency",
            description:
              "React is a JavaScript library for building user interfaces.",
            notes: "Uses deprecated code",
          },
        ],
        exports: [],
        functions: [
          {
            name: "component/getSomething",
            description: "This is a function",
            ExternalLocation: "src/components/helpers/helpers.js",
            parameters: "(int componentID)",
            returns: "(Object something)",
            notes: "Needs to be refactored",
          },
        ],
        connectedFiles: {
          parents: [],
          children: [],
          helpers: [],
        },
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
