import { writable, readable } from "svelte/store";
import Node from "./Node.js";

export const root = writable(new Node());
