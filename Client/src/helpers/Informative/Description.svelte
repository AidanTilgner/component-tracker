<script>
  export let title, values, onChange;
  import InfoItem from "./InfoItem.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import Form from "../../helpers/Form/Form.svelte";

  let editableValues = {};
  values.forEach((value) => {
    editableValues[value.title] = value.text;
  });
  let editing = false;
</script>

<div class="description">
  <Header
    {title}
    type="breadcrumbs"
    margin={[0, 0, 36, 0]}
    buttons={[
      {
        text: "Edit",
        type: "secondary",
        action: () => (editing = true),
      },
    ]}
  />
  <div class="description__border" />
  {#each values as value}
    <InfoItem title={value.title} value={value.text} type={value.type} />
  {/each}
  <Modal
    open={editing}
    title="Edit '{title}'"
    buttons={[
      {
        text: "Close",
        type: "secondary",
        action: () => (editing = false),
      },
      { text: "Submit", type: "primary", action: () => (editing = false) },
    ]}
  >
    <Form
      data={editableValues}
      onChange={(e, inputs) => {
        e.preventDefault();
        onChange(e, inputs);
      }}
      prefilled={true}
    />
  </Modal>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .description {
    position: relative;
    padding-inline-start: 28px;

    &__border {
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: $color-orange;
      border-radius: 25px;
    }
  }
</style>
