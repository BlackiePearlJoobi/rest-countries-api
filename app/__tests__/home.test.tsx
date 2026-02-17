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
  useSearchParams: () => new URLSearchParams(), // for Pagination
}));

// Mock fetch for server components
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCountries),
    }),
  ) as jest.Mock;
});

describe("Page render", () => {
  it("renders the container", async () => {
    const ui = await Home({ searchParams: {} });
    const { container } = render(ui); // `countainer` is the root DOM node (usually a <div>) appended by default to document.body

    expect(container).toBeInTheDocument();
  });

  it("shows the filter", async () => {
    const ui = await Home({ searchParams: {} });
    render(ui);

    expect(
      screen.getByRole("combobox", { name: /filter by region/i }),
    ).toBeInTheDocument(); // `screen` represents the entire rendered document; `combobox` is the ARIA role of <select> element
  });

  it("shows the search box", async () => {
    const ui = await Home({ searchParams: {} });
    render(ui);

    expect(
      screen.getByRole("searchbox", { name: /search for a country/i }),
    ).toBeInTheDocument();
  });
});

describe("Top page", () => {
  it("shows the first eight countries", async () => {
    const ui = await Home({ searchParams: {} });
    render(ui);
    const list = screen.getByRole("list", { name: /countries list/i }); // scoping into the outer <ul>
    const items = Array.from(list.children); // the direct child <li>s

    expect(items).toHaveLength(8);
  });

  it("navigates to page 2 when the user clicks next", async () => {
    const ui = await Home({ searchParams: {} });
    render(ui);
    const nextLink = screen.getByRole("link", { name: /next/i });

    expect(nextLink).toHaveAttribute("href", "/?page=2");
  });

  it("navigates from page 2 to page 3", async () => {
    const ui = await Home({ searchParams: { page: "2" } });
    render(ui);
    const nextLink = screen.getByRole("link", { name: /next/i });

    expect(nextLink).toHaveAttribute("href", "/?page=3");
  });
});
