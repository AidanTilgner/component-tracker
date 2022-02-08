import createAuth0Client from "@auth0/auth0-spa-js";
import { isAuthenticated, popupOpen, error } from "../../data/auth";
import { config } from "../../../auth_config.js";

export const createClient = async () => {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });

  return auth0Client;
};

export const loginWithPopup = async (client, options) => {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
};

export const logout = async (client) => {
  client.logout();
};

const auth = {
  createClient,
  loginWithPopup,
  logout,
};

export default auth;
