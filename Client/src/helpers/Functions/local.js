export const writeToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
  console.log("Set Local Storage: ", key, value);
};

export const readFromLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};

export const writeToSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, value);
  console.log("Set Session Storage: ", key, value);
};

export const readFromSessionStorage = (key) => {
  return window.sessionStorage.getItem(key);
};

export const logLocalStorage = () => {
  console.log(window.localStorage);
};
