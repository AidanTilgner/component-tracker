export const formatKey = (key) => {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
    return str.toUpperCase();
  });
};

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
  console.log("Value: ", value);
  console.log("Typeof Value: ", typeof value);
  switch (typeof value) {
    // types are text, breadcrumbs, link, list
    case "string":
      if (value.includes("http")) return "link";
      if (value.includes("/")) return "breadcrumbs";
      return "text";
    case "object":
      if (Array.isArray(value)) {
        if (typeof value[0] === "object") {
          if ("name" in value[0] && "type" in value[0]) return "tags";
          return "object-list";
        }
        return "list";
      }
      return "text";
    default:
      return "text";
  }
};

export const formatBreadcrumbs = (breadcrumbs) => {
  breadcrumbs = breadcrumbs
    .split("/")
    .map((item, index) => {
      if (index === breadcrumbs.split("/").length - 1) {
        return `<span style="font-weight: 600;">${item}</span>`;
      }
      return `${item}/`;
    })
    .join("");

  return breadcrumbs;
};

export const formatLink = (link) => {
  return `<a href="${link}" target="_blank" style="color: #2256f2;">${link}</a>`;
};

export const formatList = (list) => {
  list = list.map((item, index) => {
    return `<span title="${
      "(" + item.type + ") " + item.description
    }" style="font-weight: 600; cursor: pointer;">${item.name}${
      index !== list.length - 1 ? ", " : ""
    }</span>`;
  });

  list = "(" + list.join("") + ")";

  return list;
};
