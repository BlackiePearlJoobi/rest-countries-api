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
    <main>
      <div className="w-full flex-col lg:flex-row">
        <form
          action="/country"
          method="GET"
          className="w-full h-[48px] py-[16.22px] flex"
        >
          <Image
            src={`/assets/images/search-light.svg`}
            width={15.56}
            height={15.56}
            alt=""
            className="w-auto h-auto"
          ></Image>
          <input
            type="search"
            name="q" // Next.js  receives it as searchParams.q
            placeholder="Search for a country..."
            className="peer"
            defaultValue=""
          ></input>
          <button
            type="submit"
            className="cursor-pointer hidden peer-not-placeholder-shown:block"
          >
            <Image
              src={`/assets/images/search-blue.svg`}
              width={15.56}
              height={15.56}
              alt="search icon"
            ></Image>
          </button>
        </form>
        <form method="GET">
          <select name="region" defaultValue="">
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <button type="submit" className="cursor-pointer">
            Apply
          </button>
        </form>
      </div>
      <section>
        <ul>
          {filtered.map((country) => (
            <li key={country.alpha3Code} className="w-[264px] h-[336px]">
              <Link href={`/country/${country.alpha3Code}`} className="w-full">
                <Image
                  src={country.flag}
                  width={264}
                  height={160}
                  alt={`Flag of ${country.name}`}
                  className="w-full h-auto"
                ></Image>
                <h2>{country.name}</h2>
                <ul>
                  <li>Population: {country.population.toLocaleString()}</li>
                  <li>Region: {country.region}</li>
                  <li>Capital: {country.capital}</li>
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
