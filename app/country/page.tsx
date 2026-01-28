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
    <div>
      <BackButton></BackButton>
      <h1>No exact match found for &quot;{query}&ldquo;</h1>
      {partialMatches.length > 0 && (
        <section>
          <p>Are you looking for the following countries?</p>
          <ul>
            {partialMatches.map((country) => (
              <li key={country.alpha3Code}>
                <Link href={`/country/${country.alpha3Code}`}>
                  <Image
                    src={country.flag}
                    width={260}
                    height={160}
                    alt={`Flag of ${country.name}`}
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
      )}
      {partialMatches.length === 0 && <p>No similar countries found.</p>}
    </div>
  );
};

export default CountrySearchPage;
