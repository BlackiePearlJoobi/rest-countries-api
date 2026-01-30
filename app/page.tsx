import Image from "next/image";
import data from "./data.json";
import Link from "next/link";

const Home = async ({
  searchParams,
}: {
  searchParams: { region?: string };
}) => {
  const region = (await searchParams).region || "";

  const filtered = data.filter((country) => {
    if (!region) return true;
    return country.region === region;
  });

  return (
    <main className="px-4 pt-6 pb-16.25 bg-(--gray-50) sm:px-10 sm:pt-12 sm:pb-14.5 lg:pb-12">
      <div className="mb-8 w-full flex flex-col gap-10 sm:mb-12 sm:flex-row sm:gap-2 lg:justify-between">
        <form
          action="/country"
          method="GET"
          className="w-full h-12 px-8 py-3.75 box-light text-preset-6-regular flex sm:h-14 sm:flex-1 sm:text-preset-5-regular lg:flex-none lg:w-120"
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
            className="cursor-pointer hidden peer-not-placeholder-shown:flex ml-3 p-1 bg-gray-200 rounded items-center"
          >
            Search
          </button>
        </form>
        <form
          method="GET"
          className="w-50 h-12 py-3.75 box-light text-preset-6-regular flex justify-center gap-2 sm:w-55 sm:h-14 sm:text-preset-5-regular"
        >
          <select name="region" defaultValue="" className="peer pr-4">
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <button
            type="submit"
            className="cursor-pointer hidden peer-has-[option:checked:not([value=''])]:flex p-1 bg-gray-200 rounded items-center"
          >
            Apply
          </button>
        </form>
      </div>
      <section>
        <ul className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-18">
          {filtered.map((country) => (
            <li key={country.alpha3Code} className="w-66 h-84 box-light">
              <Link href={`/country/${country.alpha3Code}`} className="w-full">
                <Image
                  src={country.flag}
                  width={264}
                  height={160}
                  alt={`Flag of ${country.name}`}
                  className="w-full h-40 rounded-t-[5px]"
                ></Image>
                <div className="ml-6 mt-5.5 mb-12 flex flex-col gap-4">
                  <h2 className="text-preset-3">{country.name}</h2>
                  <ul className="text-preset-5-light leading-4 flex flex-col gap-2">
                    <li className="h-4">
                      <span className="text-preset-5-semibold">
                        Population:{" "}
                      </span>
                      {country.population.toLocaleString()}
                    </li>
                    <li className="h-4">
                      <span className="text-preset-5-semibold">Region: </span>
                      {country.region}
                    </li>
                    <li className="h-4">
                      <span className="text-preset-5-semibold">Capital: </span>
                      {country.capital}
                    </li>
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
