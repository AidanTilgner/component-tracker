<script>
  export let title, values, onChange, onSubmit, buttons;
  import InfoItem from "./InfoItem/InfoItem.svelte";
  import Header from "../../helpers/Header/Header.svelte";
  import Modal from "../../helpers/Modal/Modal.svelte";
  import Form from "../../helpers/Form/Form.svelte";
  import NonDynamic from "../Form/NonDynamic.svelte";
  import { formatKey } from "../../helpers/Functions/formatting.js";
  import AlertBanner from "./AlertBanner/AlertBanner.svelte";
  import ArrayListInput from "../Input/components/ArrayListInput.svelte";

  let editing = false;
</script>

<div class="description">
  <Header
    {title}
    type="breadcrumbs"
    margin={[0, 0, 14, 0]}
    buttons={buttons
      ? [
          {
            text: "Edit",
            type: "secondary",
            action: () => (editing = true),
          },
          ...buttons,
        ]
      : [
          {
            text: "Edit",
            type: "secondary",
            action: () => (editing = true),
          },
        ]}
  />
  <div class="description__items">
    {#each values as value}
      <InfoItem
        title={formatKey(value.name)}
        value={value.value}
        type={value.type !== "textarea" ? value.type : "text"}
      />
    {/each}
  </div>
  <Modal
    open={editing}
    title="Edit '{title}'"
    buttons={[
      {
        text: "Close",
        type: "secondary",
        action: () => (editing = false),
      },
      {
        text: "Submit",
        type: "primary",
        action: () => {
          editing = false;
          onSubmit(values);
        },
      },
    ]}
  >
    <NonDynamic
      fields={values}
      onChange={(e, values) => {
        onChange(e, values);
      }}
    />
  </Modal>
</div>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .description {
    position: relative;
    margin: 36px 0;

    &__items {
      border-left: 2px solid $color-orange;
      padding-inline-start: 28px;
    }
  }
</style>
