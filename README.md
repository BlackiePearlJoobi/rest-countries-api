- dark mode test

## Jest

### Mock `fetch`

The Next.js server components such as `app/page.tsx` and `app/countries/[code]/page.tsx` calls `fetch`:

```tsx
await fetch("https://restcountries.com/v3.1/all?...");
```

However, Jest run in Node, which does NOT provide `fetch`, resulting in `ReferenceError: fetch is not defined` when it runs a test.

To fix this, I mocked `fetch`, replacing the real function with a fake one that returns fake data.

About 40 countries data was needed for the tests, so I created a separate `countries.fixture.ts` file in `__tests__/fixtures` folder and import it in the test file. By default Jest trys to find a test in every file inside `__test__` and repots "a failed test" if it can't, so make sure to add `testPathIgnorePatterns: ["/fixtures/"],` to `jest.config.ts` to prevent Jest from looking for a test in any file inside `fixtures`.

```ts
// jest.config.ts
const config: Config = {
  ...
  testPathIgnorePatterns: ["/fixtures/"],
};
```

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

1. `beforeAll(() => { ... })` - This means: “Before any test runs, set up this mock.” It runs once for the entire test file.
2. `global.fetch = ...` - This replaces the real `fetch` with my own function.
3. `jest.fn(() => ...)` - It creates a mock function. When `fetch()` is called, this function will be run.
4. `Promise.resolve({ ... })` - `fetch` normally returns a `Promise<Response>`, so the mock function must also return a `Promise`. This part means: “`fetch()` resolves to an object that looks like a `Response`.” A real `Response object` has a `.json()` method, so it includes one.
5. `json: () => Promise.resolve([...])` - In my server components:

```tsx
const response = await fetch(...)
const countries = await response.json()
```

So the mock function must behave the same way:

- `fetch()` returns an object
- that object has a `.json()` method
- `.json()` returns a `Promise`
- that `Promise` resolves to the array of fake countries

6. `as jest.Mock` - It is a type annotation of a Jest mock function.
