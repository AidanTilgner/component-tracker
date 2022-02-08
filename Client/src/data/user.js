import { writable } from "svelte/store";
import {
  readFromLocalStorage,
  readFromSessionStorage,
} from "../helpers/Functions/local";

console.log(
  "Tokens",
  readFromLocalStorage("refreshToken"),
  readFromSessionStorage("accessToken")
);

console.log("User", readFromLocalStorage("user"));

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
