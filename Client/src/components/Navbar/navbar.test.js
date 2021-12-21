import Navbar from "./Navbar.svelte";
import { render, screen } from "@testing-library/svelte";
import { intros } from "svelte/internal";

it("Renders Navbar DIV", () => {
  render(Navbar);
  const navbar = screen.getByTestId("navbar");
  expect(navbar).toBeInTheDocument();
});

it("Has Navbar Title", () => {
  render(Navbar);
  const navbarTitle = screen.getByTestId("navbar-title");
  expect(navbarTitle).toBeInTheDocument();
});
