<script>
  export let data, onSubmit;
  // Fields will be an object, and we will be mapping through each key/value pair
  // to create a form element.
  console.log(data);

  let formatKey = (key) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
      return str.toUpperCase();
    });
  };

  let inferTypeFromValue = (value) => {
    // This function will take a value and return a type based on the value given
    console.log("Value: ", typeof value);
    switch (typeof value) {
      case "string":
        return "text";
      case "number":
        return "number";
      case "boolean":
        return "checkbox";
      case "object":
        // If it's an array, we need a list
        if (Array.isArray(value)) {
          // If the array is of object, we need an object list
          // If it's of strings, we need a string list
          if (value[0] && typeof value[0] === "object") {
            return "object-list";
          } else {
            return "string-list";
          }
        }

      default:
        return "text";
    }
  };
</script>

<form class="form">
  {#each Object.keys(data) as key}
    <div class="form__field">
      <label for={key} class="form__label">{formatKey(key)}</label>
      <input
        type="text"
        id={key}
        name={key}
        value={data[key]}
        class={`form__input ${"input__" + inferTypeFromValue(data[key])}`}
        placeholder={key}
      />
    </div>
  {/each}
</form>

<style type="text/scss">
  @import "../../styles/partials/variables";
  @import "../../styles/partials/typography";
  @import "../../styles/partials/mixins";

  .form {
    &__field {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
    }

    &__label {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 14px;
    }

    &__input {
      background-color: white;
      height: 45px;
      border: 1.5px solid #c4c4c4;
      border-radius: 5px;
      box-shadow: inset 0.2px 0.2px 5px 0 rgba($color: #000000, $alpha: 0.25);

      &:hover {
      }

      &:focus {
        outline: none;
        border: 2px solid $color-primary;
      }
    }
  }

  .input {
    &__text {
      width: 50%;
    }
  }
</style>
