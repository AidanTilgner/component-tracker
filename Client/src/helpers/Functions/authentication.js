import { user, tokens } from "../../data/user";
import { goto } from "@roxi/routify";
import { refreshAccessToken } from "./backend.js";
import { writeToSessionStorage } from "./local.js";

const EP = {
  users: "/users",
  projects: "/projects",
  auth: "/auth",
};

let refreshToken;
tokens.subscribe((tokens) => {
  refreshToken = tokens.refresh;
});

export const verifyLoginStatus = async () => {
  try {
    if (refreshToken === "") {
      return false;
    }
    const response = await fetch(`${SERVER_URL}${EP.auth}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.refresh}`,
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    }).then((res) => res.json());
    console.log("verifyLoginStatus: ", response);
    if (response.status === 403 || response.error) {
      console.log("Forbidden");
      return false;
    }
    writeToSessionStorage("accessToken", response.token);
    return true;
  } catch (error) {
    console.error("Error in verifyLoginStatus: ", error);
    return false;
  }
};
