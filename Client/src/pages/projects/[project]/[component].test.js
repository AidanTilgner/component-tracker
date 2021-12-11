import component from "./index.svelte";
import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";

it("Has Navbar", () => {
  render(component);
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

it("Has Component", () => {
  render(component);
  expect(screen.getByTestId("component")).toBeInTheDocument();
});
