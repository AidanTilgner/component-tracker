import Index from "./index.svelte";
import { userCookie } from "../data/user.js";

// If a cookie with the user value is found, then the user is logged in

let index = new Index({ props: { user: user } });
