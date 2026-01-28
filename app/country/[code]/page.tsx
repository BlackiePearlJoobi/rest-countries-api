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
    <>
      <BackButton></BackButton>
      <article>
        <Image
          src={country.flag}
          width={320}
          height={229}
          alt={`Flag of ${country.name}`}
        ></Image>
        <div className="">
          <h2>{country.name}</h2>
          <div className="">
            <ul>
              <li>Native Name: {country.nativeName}</li>
              <li>Population: {country.population.toLocaleString()}</li>
              <li>Region: {country.region}</li>
              <li>Sub Region: {country.subregion}</li>
              <li>Capital: {country.capital}</li>
            </ul>
            <ul>
              <li>Top Level Domain: {country.topLevelDomain}</li>
              <li>
                Currencies:&nbsp;
                {country.currencies?.map((currency, i) => (
                  <span key={currency.code}>
                    {currency.name}
                    {i < country.currencies.length - 1 && `, `}
                  </span>
                ))}
              </li>
              <li>
                Languages:&nbsp;
                {country.languages?.map((language, i) => (
                  <span key={language.iso639_2}>
                    {language.name}
                    {i < country.languages.length - 1 && `, `}
                  </span>
                ))}
              </li>
            </ul>
          </div>
          <div>
            <span>Border Countries:</span>
            <ul className="flex flex-wrap justify-evenly">
              {country.borders?.map((neighbor) => (
                <li key={neighbor}>
                  <Link href={`/country/${neighbor}`}>{neighbor}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
};

export default CountryPage;
