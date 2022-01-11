import { writeable } from "svelte/store";

export const user = writeable({
  id: "",
  name: "",
  email: "",
  password: "",
  role: "",
  projects: [],
});
