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

    expect(screen.getByRole("heading", { name: "Ayurveda Store" })).toBeInTheDocument();
    expect(screen.getByText("Medical products")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ayurvedic medical products" })).toBeInTheDocument();
    expect(screen.getByText("Women Wellness Kit")).toBeInTheDocument();
    expect(screen.getByText("₹1,499–₹3,100")).toBeInTheDocument();
  });

  it("renders product images from the local store assets", () => {
    render(<Store />);

    const productImage = screen.getByAltText("Infertility Management Kit");
    expect(productImage.getAttribute("src")).toContain("/src/assets/store/fordesktop/");
  });
});
