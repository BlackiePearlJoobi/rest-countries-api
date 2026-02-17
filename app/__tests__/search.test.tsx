import { render, screen } from "@testing-library/react";
import { mockCountries } from "./fixtures/countries.fixture";
import { redirect } from "next/navigation";
import CountrySearchPage from "../countries/page";

// Mock Next.js App Router (useRouter, usePathname, useSearchParams)
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/countries", // for Pagination
  useSearchParams: () => new URLSearchParams(), // for Pagination
  redirect: jest.fn(), // for exact match
}));

// Mock fetch for server components
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCountries),
    }),
  ) as jest.Mock;
});

describe("Search", () => {
  it("redirects to the exact match with a common name", async () => {
    const ui = await CountrySearchPage({ searchParams: { q: "spain" } });
    render(ui);

    expect(redirect).toHaveBeenCalledWith("/countries/ESP");
  });

  it("redirects to the exact match with a country code", async () => {
    const ui = await CountrySearchPage({ searchParams: { q: "esp" } });
    render(ui);

    expect(redirect).toHaveBeenCalledWith("/countries/ESP");
  });

  it("finds no exact match and similar countries", async () => {
    const ui = await CountrySearchPage({ searchParams: { q: "abc" } });
    render(ui);

    expect(screen.getByText(/no exact match found/i)).toBeInTheDocument();
    expect(screen.getByText(/no similar countries found/i)).toBeInTheDocument();
  });

  it("finds no exact match but shows similar countries", async () => {
    const ui = await CountrySearchPage({ searchParams: { q: "a" } });
    render(ui);

    expect(screen.getByText(/no exact match found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you looking for the following countries?/i),
    ).toBeInTheDocument();

    const list = screen.getByRole("list", { name: /countries list/i });
    expect(list).toBeInTheDocument();
  });
});
