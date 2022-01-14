export const copyObj = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = defaultType(typeof obj[key], obj[key]);
  });
  console.log("new: ", newObj);
  return newObj;
};

export const defaultType = (type, value) => {
  switch (type) {
    case "object":
      if (Array.isArray(value)) return [];
      return {};
    case "string":
      return "";
    case "number":
      return 0;
    case "null":
      return null;
    case "boolean":
      return false;
    default:
      return "";
  }
};
