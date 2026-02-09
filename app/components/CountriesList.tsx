import { Country } from "../types/definitions";
import Link from "next/link";
import Image from "next/image";

const CountriesList = ({ list }: { list: Country[] }) => {
  return (
    <ul className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-18">
      {list.map((country: Country) => (
        <li
          key={country.cca3}
          className="w-66 h-84 box-light dark:bg-(--blue-900)"
        >
          <Link href={`/country/${country.cca3}`} className="w-full">
            <Image
              src={
                country.flags.svg || country.flags.png || "/fallback-flag.svg"
              }
              width={264}
              height={160}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-full h-40 rounded-t-[5px]"
            ></Image>
            <div className="ml-6 mt-5.5 mb-12 flex flex-col gap-4">
              <h2 className="text-preset-3">{country.name.common}</h2>
              <ul className="text-preset-5-light leading-4 flex flex-col gap-2">
                <li className="h-4">
                  <span className="text-preset-5-semibold">Population: </span>
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
  );
};

export default CountriesList;
