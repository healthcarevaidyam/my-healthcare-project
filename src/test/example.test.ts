import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Layout from "@/components/Layout";

describe("Layout banner behavior", () => {
  it("shows the services banner on a refreshed service detail page", () => {
    render(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/services/arthritis-treatment"] },
        React.createElement(
          Routes,
          null,
          React.createElement(
            Route,
            { element: React.createElement(Layout) },
            React.createElement(Route, {
              path: "/services/:slug",
              element: React.createElement("div", null, "Service detail page"),
            })
          )
        )
      )
    );

    expect(screen.getByRole("img", { name: "Our Services banner" })).toBeInTheDocument();
  });
});
