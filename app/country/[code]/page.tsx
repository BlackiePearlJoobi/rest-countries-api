import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import data from "../../data.json";
import { notFound } from "next/navigation";
import BackButton from "@/app/components/BackButton";

const CountryPage = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const code = (await params).code;
  const country = data.find((country) => country.alpha3Code === code);

  if (!country) {
    notFound();
  }

  return (
    <main className="mx-[27.5px] mt-10 mb-13.75 sm:mx-auto sm:max-w-150 xl:mt-20 xl:min-w-315">
      <BackButton></BackButton>
      <article className="mt-16 flex flex-col items-center gap-12 sm:mt-14 sm:gap-14 xl:mt-20 xl:flex-row xl:gap-30">
        <Image
          src={country.flag}
          width={320}
          height={229}
          alt={`Flag of ${country.name}`}
          className="w-auto h-57.25 rounded-[10px] sm:h-102 xl:max-w-140 xl:max-h-100"
        ></Image>
        <div className="self-start w-full xl:self-center">
          <h2 className="mb-4 text-preset-2 sm:mb-6 sm:text-preset-1">
            {country.name}
          </h2>
          <div className="flex flex-col gap-8 sm:w-full sm:flex-row sm:justify-between">
            <ul className="text-preset-5-light leading-4 flex flex-col gap-2 sm:text-preset-4-light">
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Native Name:{" "}
                </span>
                {country.nativeName}
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
                {country.capital}
              </li>
            </ul>
            <ul className="text-preset-5-light leading-4 flex flex-col gap-2 sm:text-preset-4-light">
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Top Level Domain:{" "}
                </span>
                {country.topLevelDomain}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Currencies:&nbsp;
                </span>
                {country.currencies?.map((currency, i) => (
                  <span key={currency.code}>
                    {currency.name}
                    {i < country.currencies.length - 1 && `, `}
                  </span>
                ))}
              </li>
              <li>
                <span className="text-preset-5-semibold sm:text-preset-4-semibold">
                  Languages:&nbsp;
                </span>
                {country.languages?.map((language, i) => (
                  <span key={language.iso639_2}>
                    {language.name}
                    {i < country.languages.length - 1 && `, `}
                  </span>
                ))}
              </li>
            </ul>
          </div>
          <div className="mt-8 sm:flex sm: flex-row sm:items-center sm:gap-4">
            <span className="text-preset-4-semibold leading-6 sm:min-w-32">
              Border Countries:
            </span>
            <ul className="mt-4 flex flex-wrap gap-4 sm:mt-0">
              {country.borders?.map((neighbor) => (
                <li
                  key={neighbor}
                  className="min-w-24 h-7 box-light rounded-xs text-preset-6-light flex items-center justify-center sm:text-preset-5-light"
                >
                  <Link href={`/country/${neighbor}`}>{neighbor}</Link>
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
