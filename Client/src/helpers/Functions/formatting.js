export const formatKey = (key) => {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
    return str.toUpperCase();
  });
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
