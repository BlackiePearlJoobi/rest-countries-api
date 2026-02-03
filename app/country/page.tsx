import { redirect } from "next/navigation";
import data from "../data.json";
import Link from "next/link";
import Image from "next/image";
import BackButton from "../components/BackButton";

const CountrySearchPage = async ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const query = (await searchParams).q?.toLowerCase() || "";

  const match = data.find(
    (c) =>
      c.name.toLowerCase() === query || c.alpha3Code.toLowerCase() === query,
  );

  if (match) {
    redirect(`/country/${match.alpha3Code}`);
  }

  const partialMatches = data.filter((c) =>
    c.name.toLowerCase().includes(query),
  );

  return (
    <div className="mx-21 mt-10">
      <BackButton></BackButton>
      <h1 className="mt-8 text-preset-4-semibold">
        No exact match found for &quot;{query}&ldquo;
      </h1>
      {partialMatches.length > 0 && (
        <section>
          <p className="text-preset-4-light mb-6">
            Are you looking for the following countries?
          </p>
          <ul className="flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-18">
            {partialMatches.map((country) => (
              <li
                key={country.alpha3Code}
                className="w-66 h-84 box-light dark:bg-(--blue-900)"
              >
                <Link
                  href={`/country/${country.alpha3Code}`}
                  className="w-full"
                >
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
                        <span className="text-preset-5-semibold">
                          Capital:{" "}
                        </span>
                        {country.capital}
                      </li>
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {partialMatches.length === 0 && (
        <p className="text-preset-4-semibold">No similar countries found.</p>
      )}
    </div>
  );
};

export default CountrySearchPage;
