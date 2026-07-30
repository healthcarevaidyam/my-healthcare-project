import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Store from "./Store";

describe("Store", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the curated wellness products with their details", () => {
    render(<Store />);

    expect(screen.getByText("Our wellness products")).toBeInTheDocument();
    expect(screen.getByText("InInfertility Management Kit")).toBeInTheDocument();
    expect(screen.getByText("₹1499-₹3100")).toBeInTheDocument();
  });

  it("renders product images from the local store assets", () => {
    render(<Store />);

    const productImage = screen.getByAltText("InInfertility Management Kit");
    expect(productImage.getAttribute("src")).toContain("/src/assets/store/fordesktop/");
  });
});
