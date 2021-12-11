import index from "./index.svelte";
import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";

it("Has Navbar", () => {
  render(index);
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

it("Has home div", () => {
  render(index);
  expect(screen.getByTestId("home")).toBeInTheDocument();
});

it("Has Recent Projects Header", () => {
  render(index);
  expect(screen.getByText({ text: "Recent Projects" })).toBeInTheDocument();
});

it("Has Projects Header Buttons", () => {
  render(index);
  expect(screen.getByText({ text: "All Projects" })).toBeInTheDocument();
  expect(screen.getByText({ text: "New Project" })).toBeInTheDocument();
});

it("Has Preview Grid", () => {
  render(index);
  expect(screen.getByTestId("preview-grid")).toBeInTheDocument();
});
