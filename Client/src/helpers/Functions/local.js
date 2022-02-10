export const writeToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const readFromLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};

export const deleteFromLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};

export const writeToSessionStorage = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

export const readFromSessionStorage = (key) => {
  return window.sessionStorage.getItem(key);
};

export const deleteFromSessionStorage = (key) => {
  window.sessionStorage.removeItem(key);
};

export const logLocalStorage = () => {
  console.log(window.localStorage);
};
