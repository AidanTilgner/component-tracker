export const wrapAsync = (fn) => {
  return (req, res, next) => {
    const fnReturn = fn(req, res, next);
    return Promise.resolve(fnReturn).catch(next);
  };
};

export const filterForMessages = (obj) => {
  if (obj.message) {
    return obj;
  }
  if (obj.error) {
    return obj;
  }
  return false;
};
