export const formatKey = (key) => {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
    return str.toUpperCase();
  });
};

export const inferInputTypeFromValueType = (value) => {
  // This function will take a value and return a type based on the value given
  switch (typeof value) {
    case "string":
      if (value.length > 30) return "textarea";
      return "text";
    case "number":
      return "text";
    case "boolean":
      return "radio";
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

export const inferInfoItemTypeFromValueType = (value) => {
  // This function will take a value and return a type based on the value given
  switch (typeof value) {
    // types are normal, breadcrumbs, link, list, paragraph
    case "string":
      if (value.includes("/")) return "breadcrumbs";
      if (value.includes("</a>")) return "link";
      if (value.length > 30) return "paragraph";
      return "normal";
    case "number":
      return "normal";
    case "boolean":
      return "normal";

    default:
      return "normal";
  }
};

export const formatBreadcrumbs = (breadcrumbs) => {
  breadcrumbs = breadcrumbs
    .split("/")
    .map((item, index) => {
      console.log("Item:", item, "index:", index);
      if (index === breadcrumbs.split("/").length - 1) {
        console.log("Item is last item");
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
