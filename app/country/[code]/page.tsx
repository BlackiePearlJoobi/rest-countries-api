import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import { Country } from "@/app/types/definitions";

const CountryPage = async ({ params }: { params: { code: string } }) => {
  const code = (await params).code.toUpperCase();

  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}?fields=cca3,flags,name,population,region,subregion,capital,tld,currencies,languages,borders`,
  );
  const country: Country = await response.json();

  console.log(country);

  if (!country) {
    notFound();
  }

  const nativeName =
    Object.values(country.name.nativeName ?? {})[0]?.official ??
    country.name.official;
  const currencyNames = Object.values(country.currencies ?? {}).map(
    (c) => c.name,
  );
  const languages = Object.values(country.languages ?? {});

  return (
    <main className="mx-[27.5px] mt-10 mb-13.75 sm:mx-auto sm:max-w-150 xl:mt-20 xl:min-w-315">
      <BackButton></BackButton>
      <article className="mt-16 flex flex-col items-center gap-12 sm:mt-14 sm:gap-14 xl:mt-20 xl:flex-row xl:gap-30">
        <Image
          src={country.flags.svg || country.flags.png || "/fallback-flag.svg"}
          width={320}
          height={229}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-auto h-57.25 rounded-[10px] sm:h-102 xl:max-w-140 xl:max-h-100"
        ></Image>
        <div className="self-start w-full xl:self-center">
          <h2 className="mb-4 text-preset-2 sm:mb-6 sm:text-preset-1">
            {country.name.common}
          </h2>
          <div className="flex flex-col gap-8 sm:w-full sm:flex-row sm:justify-between">
            <ul className="text-preset-5-light leading-4 flex flex-col gap-2 sm:text-preset-4-light">
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Native Name:{" "}
                </span>
                {nativeName}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Population:{" "}
                </span>
                {country.population.toLocaleString()}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Region:{" "}
                </span>
                {country.region}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Sub Region:{" "}
                </span>
                {country.subregion}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Capital:{" "}
                </span>
                {country.capital?.join(", ") ?? "N/A"}
              </li>
            </ul>
            <ul className="text-preset-5-light leading-4 flex flex-col gap-2 sm:text-preset-4-light">
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Top Level Domain:{" "}
                </span>
                {country.tld?.join(", ")}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Currencies:&nbsp;
                </span>
                {currencyNames.join(", ")}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Languages:&nbsp;
                </span>
                {languages.join(", ")}
              </li>
            </ul>
          </div>
          <div className="mt-8 sm:flex sm: flex-row sm:items-center sm:gap-4">
            <span className="text-preset-4-semibold leading-6 sm:min-w-32">
              Border Countries:
            </span>
            <ul className="mt-4 flex flex-wrap gap-4 sm:mt-0">
              {country.borders?.map((neighbor) => (
                <li key={neighbor}>
                  <Link
                    href={`/country/${neighbor}`}
                    className="min-w-24 h-7 box-light dark:bg-(--blue-900) rounded-xs text-preset-6-light flex items-center justify-center sm:text-preset-5-light"
                  >
                    {neighbor}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
};

export default CountryPage;
