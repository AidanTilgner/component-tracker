import { writable } from "svelte/store";

export const userCredentials = writable({
  username: "",
  password: "",
});

export const user = writable({
  id: "",
  username: "",
  email: "",
  password: "",
  role: "",
  projects: [],
});
