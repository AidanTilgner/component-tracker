import { readable } from "svelte/store";
import dotenv from "dotenv";

export const env = new readable({
  Hello: TEST_ENV,
});
