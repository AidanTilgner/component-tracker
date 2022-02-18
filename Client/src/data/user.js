import { writable } from "svelte/store";
import {
  readFromLocalStorage,
  readFromSessionStorage,
} from "../helpers/Functions/local.js";

export const tokens = writable({
  access: readFromSessionStorage("accessToken") || "",
  refresh: readFromLocalStorage("refreshToken") || "",
});

export const user = writable(
  readFromLocalStorage("user")
    ? JSON.parse(readFromLocalStorage("user"))
    : {
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
        projects: [],
      }
);
