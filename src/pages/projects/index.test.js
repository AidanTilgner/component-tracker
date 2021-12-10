import index from "./index.svelte";
import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";

it("Has Navbar", () => {
  render(index);
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

it("Has Projects Div", () => {
  render(index);
  expect(screen.getByTestId("projects")).toBeInTheDocument();
});

it("Has Project Header", () => {
  render(index);
  expect(screen.getByText("Projects")).toBeInTheDocument();
});

it("Has Preview Grid", () => {
  render(index);
  expect(screen.getByTestId("preview-grid")).toBeInTheDocument();
});
