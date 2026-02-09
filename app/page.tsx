import Image from "next/image";
import { Country } from "./types/definitions";
import CountriesList from "./components/CountriesList";

const Home = async ({
  searchParams,
}: {
  searchParams: { region?: string };
}) => {
  const region = (await searchParams).region || "";

  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=cca3,flags,name,population,region,capital",
  );
  const countries: Country[] = await response.json();

  const filtered = countries.filter((country: Country) => {
    if (!region) return true;
    return country.region === region;
  });

  return (
    <main className="px-4 pt-6 pb-16.25 sm:px-10 sm:pt-12 sm:pb-14.5 lg:pb-12">
      <div className="mb-8 w-full flex flex-col gap-10 sm:mb-12 sm:flex-row sm:gap-2 lg:justify-between">
        <form
          action="/country"
          method="GET"
          className="w-full h-12 px-8 py-3.75 box-light dark:bg-(--blue-900)  text-preset-6-regular flex sm:h-14 sm:flex-1 sm:text-preset-5-regular lg:flex-none lg:w-120"
        >
          <Image
            src={`/assets/images/search-light.svg`}
            width={15.56}
            height={15.56}
            alt=""
            className="w-[15.56px] h-auto"
          ></Image>
          <input
            type="search"
            name="q" // Next.js  receives it as searchParams.q
            placeholder="Search for a country..."
            className="peer w-full ml-6"
            defaultValue=""
          ></input>
          <button
            type="submit"
            className="cursor-pointer hidden peer-not-placeholder-shown:flex ml-3 p-1 bg-gray-200 dark:bg-(--blue-950) rounded items-center"
          >
            Search
          </button>
        </form>
        <form
          method="GET"
          className="w-50 h-12 py-3.75 box-light dark:bg-(--blue-900) text-preset-6-regular flex justify-center gap-2 sm:w-55 sm:h-14 sm:text-preset-5-regular"
        >
          <select
            name="region"
            defaultValue=""
            className="peer pr-4 dark:bg-(--blue-900)"
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <button
            type="submit"
            className="cursor-pointer hidden peer-has-[option:checked:not([value=''])]:flex p-1 bg-gray-200 dark:bg-(--blue-950) rounded items-center"
          >
            Apply
          </button>
        </form>
      </div>
      <section>
        <CountriesList list={filtered}></CountriesList>
      </section>
    </main>
  );
};

export default Home;
