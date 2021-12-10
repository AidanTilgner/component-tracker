import index from "./index.svelte";
import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";

it("Has Navbar", () => {
  render(index);
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

it("Has Project Div", () => {
  render(index);
  expect(screen.getByTestId("project")).toBeInTheDocument();
});

it("Has Project Name Header", () => {
  render(index);
  expect(screen.getByTestId("header")).toBeInTheDocument();
});

it("Has File Tree", () => {
  render(index);
  expect(screen.getByTestId("file-tree")).toBeInTheDocument();
});

it("Has SideBar", () => {
  render(index);
  expect(screen.getByTestId("sidebar")).toBeInTheDocument();
});

it("Has Modal", () => {
  render(index);
  expect(screen.getByTestId("modal")).toBeInTheDocument();
});

it("Has Form", () => {
  render(index);
  expect(screen.getByTestId("form")).toBeInTheDocument();
});
