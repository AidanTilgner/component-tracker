<script>
  import InfoItem from "../../helpers/Informative/InfoItem/InfoItem.svelte";
</script>

<div class="testing">
  <InfoItem title="Text Input" value="I am a simple text input" />
  <InfoItem
    title="Paragraph"
    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  />
  <InfoItem title="Link" value="https://www.google.com" />
  <InfoItem
    title="List Input"
    value={[
      "value 1",
      "value 2",
      "value 3",
      `<a href="https://www.google.com" target="_blank" style="color: #2256f2;">https://www.google.com</a>`,
    ]}
  />
  <InfoItem
    title="tags"
    value={[
      {
        name: "tag 1",
        type: "primary",
      },
      {
        name: "tag 2",
        type: "secondary",
      },
      {
        name: "tag 3",
        type: "success",
      },
      {
        name: "tag 4",
        type: "danger",
      },
      {
        name: "tag 5",
        type: "warning",
      },
      {
        name: "tag 6",
        type: "info",
      },
      {
        name: "tag 7",
        type: "light",
      },
      {
        name: "tag 8",
        type: "dark",
      },
    ]}
    type="tags"
  />
</div>

<style type="text/scss">
  .testing {
    width: 50%;
    height: 200px;
    margin: 24px auto;
  }
</style>
