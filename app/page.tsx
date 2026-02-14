import Image from "next/image";
import { Country } from "./types/definitions";
import CountriesList from "./components/CountriesList";
import Pagination from "./components/Pagination";

const Home = async ({
  searchParams,
}: {
  searchParams: { q?: string; region?: string; page?: string };
}) => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=cca3,flags,name,population,region,capital",
  );
  const countries: Country[] = await response.json();

  // Filter
  const region = (await searchParams).region || "";
  const filtered = countries.filter((country: Country) => {
    if (!region) return true;
    return country.region === region;
  });

  // Pagination
  const page = Number((await searchParams).page) || 1;
  const itemsPerPage = 8;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filtered.slice(start, end);

  return (
    <main className="px-4 pt-6 pb-16.25 sm:px-10 sm:pt-12 sm:pb-14.5 lg:pb-12">
      <div className="mb-8 w-full flex flex-col gap-10 sm:mb-12 sm:flex-row sm:gap-2 lg:justify-between">
        <form
          action="/countries" // tells the browser where to send the form data when the user submits it
          method="GET" // the browser will navigate to /countries and append the form data as query parameters
          className="w-full h-12 px-8 py-3.75 box-light dark:bg-(--blue-900)  text-preset-6-regular flex sm:h-14 sm:flex-1 sm:text-preset-5-regular lg:flex-none lg:w-120"
        >
          <Image
            src={`/assets/images/search-light.svg`}
            width={15.56}
            height={15.56}
            alt=""
            className="w-[15.56px] h-auto"
          ></Image>
          <label htmlFor="search" className="sr-only">
            Search for a country
          </label>
          <input
            id="search"
            type="search"
            name="q" // Next.js receives it as searchParams.q
            placeholder="Search for a country..."
            className="peer w-full ml-6"
            defaultValue=""
          ></input>

          {/* Reset page to 1 when searching */}
          <input type="hidden" name="page" value="1" />

          <button
            type="submit"
            className="cursor-pointer hidden peer-not-placeholder-shown:flex ml-3 p-1 bg-gray-200 dark:bg-(--blue-950) rounded items-center"
          >
            Search
          </button>
        </form>
        <form
          // when action is ommited, the form submits to the current page URL
          method="GET"
          className="w-50 h-12 py-3.75 box-light dark:bg-(--blue-900) text-preset-6-regular flex justify-center gap-2 sm:w-55 sm:h-14 sm:text-preset-5-regular"
        >
          <label htmlFor="region" className="sr-only">
            Filter by Region
          </label>
          <select
            id="region"
            name="region"
            defaultValue=""
            className="peer pr-4 dark:bg-(--blue-900)"
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          {/* Reset page to 1 when region changes */}
          <input type="hidden" name="page" value="1" />

          <button
            type="submit"
            className="cursor-pointer hidden peer-has-[option:checked:not([value=''])]:flex p-1 bg-gray-200 dark:bg-(--blue-950) rounded items-center"
          >
            Apply
          </button>
        </form>
      </div>
      <section>
        <CountriesList list={paginated}></CountriesList>
        <Pagination
          page={page}
          total={filtered.length}
          itemsPerPage={itemsPerPage}
        ></Pagination>
      </section>
    </main>
  );
};

export default Home;
