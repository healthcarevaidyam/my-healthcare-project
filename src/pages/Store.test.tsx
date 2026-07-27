import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Store from "./Store";

describe("Store", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows products fetched from the products endpoint", async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        {
          name: "Herbal Tea",
          price: "499",
          shortDescription: "A calming herbal blend",
          category: "Wellness",
        },
      ],
    } as Response);

    render(<Store />);

    await waitFor(() => {
      expect(screen.getByText("Herbal Tea")).toBeInTheDocument();
    });

    expect(screen.getByText("A calming herbal blend")).toBeInTheDocument();
    expect(screen.getByText("499")).toBeInTheDocument();
  });
});
