<script>
  import Input from "../../helpers/Input/Input.svelte";
</script>

<div class="testing">
  <Input
    type="string-list"
    field={{
      value: {
        test1: "test1",
        test2: "test2",
        test3: "test3",
      },
      name: "Checkbox",
    }}
    onchange={{}}
  />
</div>

<style type="text/scss">
  .testing {
    width: 50%;
    height: 200px;
    margin: 24px auto;
  }
</style>
