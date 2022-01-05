<script>
  import Input from "../../helpers/Input/Input.svelte";
</script>

<div class="testing">
  <Input
    type="select"
    field={{
      value: "Option2",
      name: "Checkbox",
      options: [
        { value: "Option1", label: "Option 1" },
        { value: "Option2", label: "Option 2" },
      ],
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
