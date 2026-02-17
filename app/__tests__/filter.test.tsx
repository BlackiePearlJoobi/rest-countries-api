import { render, screen } from "@testing-library/react";
import Home from "../page";
import { mockCountries } from "./fixtures/countries.fixture";

// Mock Next.js App Router (useRouter, usePathname, useSearchParams)
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/", // for Pagination
  useSearchParams: () => new URLSearchParams("region=Europe"), // for Pagination
}));

// Mock fetch for server components
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCountries),
    }),
  ) as jest.Mock;
});

describe("Filter", () => {
  it("shows the first eight filtered countries", async () => {
    const ui = await Home({ searchParams: { region: "Europe" } });
    render(ui);
    const list = screen.getByRole("list", { name: /countries list/i }); // the outer <ul>
    const items = Array.from(list.children); // the direct child <li>s

    expect(items).toHaveLength(8);

    items.forEach((item) => {
      expect(item.textContent?.toLowerCase()).toContain("europe");
    });
  });

  it("navigates to the second filterd page when the user clicks next", async () => {
    const ui = await Home({ searchParams: { region: "Europe" } });
    render(ui);
    const nextLink = screen.getByRole("link", { name: /next/i });

    expect(nextLink).toHaveAttribute("href", "/?region=Europe&page=2");
  });

  it("navigates from page 2 to page 3 while keeping filtered", async () => {
    const ui = await Home({ searchParams: { page: "2", region: "Europe" } });
    render(ui);
    const nextLink = screen.getByRole("link", { name: /next/i });

    expect(nextLink).toHaveAttribute("href", "/?region=Europe&page=3");
  });
});
