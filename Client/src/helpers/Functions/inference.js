export const inferInputTypeFromValueType = (value) => {
  // This function will take a value and return a type based on the value given
  // Value types: text, number, boolean, null, undefined
  // Input Types: text, textarea, select, checkbox, radio, switch, object list, string-list

  switch (typeof value) {
    case "string":
      return "text";
    case "number":
      return "text";
    case "boolean":
      return "switch";
    case "object":
      if (Array.isArray(value)) {
        if (typeof value[0] === "string") return "checkbox";
        return "array-list";
      }
      return "object-list";
    case "null":
    case "undefined":
      return "text";
    default:
      return "text";
  }
};

export const inferInfoItemTypeFromValueType = (value) => {
  // This function will take a value and return a type based on the value given
  switch (typeof value) {
    // types are normal, breadcrumbs, link, list, paragraph
    case "string":
      if (value.includes("http")) return "link";
      if (value.includes("/")) return "breadcrumbs";
      return "text";
    case "number":
      return "text";
    case "boolean":
      return "text";
    default:
      return "text";
  }
};
