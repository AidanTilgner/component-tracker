export const addComponent = (req) => {
  console.log("New Component: " + req.body);
  return req.body;
};
