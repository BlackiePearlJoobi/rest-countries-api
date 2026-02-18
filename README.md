# Countries App built with RESTful API

A fully responsive and performant web application for exploring detailed information about countries worldwide. Built with **Next.js**, **Tailwind CSS**, and the **REST Countries API**, this project takes advantage of **server‑side rendering (SSR)** to deliver fast load times, improved SEO, and a smooth user experience. It also includes a complete testing setup using **Jest** and **React Testing Library** to ensure reliability and maintainability.

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Project structure](#project-structure)
  - [Build strategy](#build-strategy)
  - [Useful resources](#useful-resources)
- [Acknowledgments](#acknowledgments)
- [Author](#author)

## Overview

### The Challenge

The goal of this project was to build a modern, performant countries explorer app that integrates multiple core features and best practices. Specifically, the challenge included:

- Implementing **server‑side rendering (SSR)** with Next.js for faster performance and improved SEO

- Fetching country data from a **RESTful API** and handling dynamic routes

- Building a **search input** to filter countries by name

- Adding a **region filter** to browse countries by geographic area

- Implementing **pagination** for smoother navigation through large datasets

- Supporting **dark mode** with a persistent theme toggle

- Writing **unit tests** with Jest and React Testing Library to ensure component reliability

### Links

- Solution URL: [GitHub repo](https://github.com/BlackiePearlJoobi/rest-countries-api)
- Live Site URL: [Vercel]()

## My process

### Built with

- **Semantic HTML + ARIA** – enhancing structure and accessibility for assistive technologies
- **Tailwind CSS** – utility-first framework for responsive, accessible UI design
- **TypeScript** – ensuring type safety and scalable logic
- **React (`useState`, `useEffect`)** – component-level logic (primarily for theme handling)
- **Next.js** – powering server‑side rendering, routing, and optimized performance
- **RESTful API** – fetching real‑time country data from the REST Countries API
- **LocalStorage** – client-side persistence for dark/light mode preferences
- **Jest + React Testing Library** - unit and integration testing for rendering, search, and filtering
- **Vercel** – deployment platform for seamless CI/CD and global edge performance

### Project Structure

This project follows a modular structure leveraging **Next.js App Router**, with clear separation of concerns between layout, data, components, and styling. Below is a breakdown of key folders and files:

<pre>
app/
├── __tests__ // Unit and integration test suite for rendering, search, and filtering
│ └── fixtures/ // Mock countries data used across tests
├── countries/ // Dynamic routes for country pages
│ └── [code]/ // Server-rendered country detail pages
├── components/ // Reusable UI components (Header, Pagination, Switch, BackButton, etc.)
├── fonts/ // Custom font imports and configurations
├── types/definitions.ts // Shared TypeScript types and interfaces
├── global.css // Tailwind base styles and custom overrides
├── layout.tsx // Global layout wrapper (includes Header)
└── page.tsx // Homepage layout and all-countries list

__mock__/next/navigation.ts // Mock implementation of Next.js routing utilities for test isolation

public/assets/ // Static image assets used throughout the site
</pre>

### Build Strategy

This project was developed with a focus on performance, accessibility, and maintainable architecture. I structured the application around modular components and server‑side rendering to ensure fast, SEO‑friendly country pages. Key strategies included:

1. Dynamic Routing with App Router and REST Countries API Integration
2. Pagination for Large Data Sets
3. Unit & Integration Testing

#### 1. Dynamic Routing with App Router and REST Countries API Integration

The directory structure `app/countries/[code]` enables intuitive, scalable routing for country detail pages. Each page is server‑rendered, ensuring fast initial loads and consistent SEO benefits.

For example, the dynamic route `app/countries/[code]/page.tsx` fetches data directly from the REST Countries API based on the code parameter:

```tsx
const CountryPage = async ({ params }: { params: { code: string } }) => {
  const code = (await params).code.toUpperCase();

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}?fields=cca3,flags,name,population,region,subregion,capital,tld,currencies,languages,borders`,
  );
  const country: Country = await response.json();

  if (!country) {
    notFound();
  }
  ...
};
```

This approach keeps data fetching on the server, reduces client‑side overhead, and ensures each country page is generated with the most up‑to‑date information.

#### 2. Pagination for Large Data Sets

To keep the countries list performant and easy to navigate, the app uses **query‑based** pagination. This approach avoids loading all countries at once and ensures that page transitions remain fast and accessible.

The Pagination component reads the current URL parameters, updates the page value, and generates new links **without triggering a full page reload**. This works seamlessly with the App Router’s built‑in routing utilities.

Example: `app/components/Pagination.tsx`

```tsx
export default function Pagination({
  page,
  total,
  itemsPerPage,
}: {
  page: number;
  total: number;
  itemsPerPage: number;
}) {
  const totalPages = Math.ceil(total / itemsPerPage);
  const pathname = usePathname(); // returns the current route path without query params (e.g., '/', '/country', etc.)
  const searchParams = useSearchParams(); // returns a ReadonlyURLSearchParams object, so you must use .get(), .has(), .entries(), etc.

  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams); // URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters.
    params.set("page", String(newPage));
    return `${pathname}?${params.toString()}`;
    // The URL is updated without reloading the whole page.
  };

  return (
    <nav className="flex...">
      {page > 1 && (
        <Link href={createPageLink(page - 1)} className="cursor-pointer...">
          Previous
        </Link>
      )}

      <span className="text-preset-5-light">
        Page <span className="text-preset-5-semibold">{page}</span> of{" "}
        <span className="text-preset-5-semibold">{totalPages}</span>
      </span>

      {page < totalPages && (
        <Link href={createPageLink(page + 1)} className="cursor-pointer...">
          Next
        </Link>
      )}
    </nav>
  );
}
```

This pattern keeps pagination logic simple, predictable, and fully compatible with server‑side rendering. It also ensures that **pagination state is reflected in the URL**, making pages shareable and bookmark‑friendly.

#### 3. Unit & Integration Testing

Testing focused on ensuring that page rendering, search behavior, region filtering, and pagination all work reliably across server and client components. Because Next.js server components rely on `fetch`, additional setup was required to make tests run correctly in Jest.

##### Mocking `fetch`

The Next.js server components such as `app/page.tsx` and `app/countries/[code]/page.tsx` call `fetch`:

```tsx
await fetch("https://restcountries.com/v3.1/all?...");
```

However, Jest run in a Node environment, which **does not provide a built‑in `fetch`**. Without a mock, tests fail with: `ReferenceError: fetch is not defined`.

To solve this, `fetch` is mocked globally and replaced with a function that returns fake data. About 40 mock countries were needed for the tests, so a dedicated `countries.fixture.ts` file was created inside `__tests__/fixtures`.

Because Jest automatically looks for tests inside every file under `__tests__`, the fixtures folder must be excluded to avoid false failures:

```ts
// jest.config.ts
const config: Config = {
  ...
  testPathIgnorePatterns: ["/fixtures/"],
};
```

The mock implementation:

```ts
// test.tsx
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCountries),
    }),
  ) as jest.Mock;
});
```

How this works:

1. `beforeAll(() => { ... })` - Runs once before all tests in the file, ensuring the mock is ready before any component calls `fetch`.
2. `global.fetch = ...` - Overrides the missing Node `fetch` with a custom mock.
3. `jest.fn(() => ...)` - Creates a mock function that behaves like `fetch`.
4. `Promise.resolve({ ... })` - Mimics the real `fetch API`, which returns a `Promise<Response>`.
5. `json: () => Promise.resolve([...])` - Simulates the `.json()` method on a real `Response` object, returning the mock countries array.(\*)
6. `as jest.Mock` - Ensures correct TypeScript typing for the mocked function.

\*In the server components:

```tsx
const response = await fetch(...)
const countries = await response.json()
```

So the mock function must behave the same way:

- `fetch()` returns an object
- that object has a `.json()` method
- `.json()` returns a `Promise`
- that `Promise` resolves to the array of fake countries

### Useful Resources

- [Next.js 15 Full Tutorial Playlist – Codevolution](https://www.youtube.com/playlist?list=PLC3y8-rFHvwhIEc4I4YsRz5C7GOBnxSJY)
  - [Episode 8 – Nested Dynamic Routes](https://www.youtube.com/watch?v=edrJf0GKfAI)

- [Tailwind CSS Cheat Sheet – Nerdcave](https://nerdcave.com/tailwind-cheat-sheet)

- [Dark mode – Tailwind CSS Official Documentation](https://tailwindcss.com/docs/dark-mode)

- [初心者でも安心！REST APIの基礎と実践的な使い方 - Qiita](https://qiita.com/inokage/items/fae28aea3d6710d7baca)

- [0からREST APIについて調べてみた - Qiita](https://qiita.com/masato44gm/items/dffb8281536ad321fb08)

## Acknowledgments

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Author

- Frontend Mentor - [@BlackiePearlJoobi](https://www.frontendmentor.io/profile/BlackiePearlJoobi)
