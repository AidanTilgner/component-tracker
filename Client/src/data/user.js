import { writable } from "svelte/store";

export const tokens = writable({
  access: "",
  refresh: "",
});

export const user = writable({
  id: "",
  username: "",
  email: "",
  password: "",
  role: "",
  projects: [],
});

export const userCookie = writable("");
