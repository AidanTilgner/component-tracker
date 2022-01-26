<script>
  import InfoItem1 from "../../helpers/Informative/InfoItem/InfoItem1.svelte";
</script>

<div class="testing">
  <InfoItem1 title="Text Input" value="I am a simple text input" />
  <InfoItem1
    title="Paragraph"
    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  />
  <InfoItem1 title="Link" value="https://www.google.com" />
  <InfoItem1
    title="List Input"
    value={[
      "value 1",
      "value 2",
      "value 3",
      `<a href="https://www.google.com" target="_blank" style="color: #2256f2;">https://www.google.com</a>`,
    ]}
  />
</div>

<style type="text/scss">
  .testing {
    width: 50%;
    height: 200px;
    margin: 24px auto;
  }
</style>
