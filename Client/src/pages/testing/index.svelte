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
</div>

<style type="text/scss">
  .testing {
    width: 50%;
    height: 200px;
    margin: 24px auto;
  }
</style>
