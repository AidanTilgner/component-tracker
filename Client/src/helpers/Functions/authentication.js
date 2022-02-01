import { user, tokens } from "../../data/user";
import { goto } from "@roxi/routify";
import { refreshAccessToken } from "./backend";

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
    console.log("Body:", JSON.stringify({ refreshToken: refreshToken }));
    const response = await fetch(`${SERVER_URL}${EP.auth}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.refresh}`,
      },
      body: JSON.stringify({ refreshToken: refreshToken }),
    });
    console.log("verifyLoginStatus: ", response.status);
    if (response.status === 403) {
      console.log("Forbidden");
      window.location.href = "/users/login";
    }
  } catch (error) {
    console.error("Error in verifyLoginStatus: ", error);
    return false;
  }
};
