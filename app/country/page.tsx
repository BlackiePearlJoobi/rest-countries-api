import { Country } from "../types/definitions";
import { redirect } from "next/navigation";
import BackButton from "../components/BackButton";
import CountriesList from "../components/CountriesList";

const CountrySearchPage = async ({
  searchParams,
}: {
  searchParams: { q?: string };
}) => {
  const query = (await searchParams).q?.toLowerCase() || "";

  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=cca3,flags,name,population,region,capital",
  );
  const countries: Country[] = await response.json();

  const match = countries.find(
    (c) =>
      c.name.common.toLowerCase() === query || c.cca3.toLowerCase() === query,
  );

  if (match) {
    redirect(`/country/${match.cca3}`);
  }

  const partialMatches = countries.filter((c) =>
    c.name.common.toLowerCase().includes(query),
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
          <CountriesList list={partialMatches}></CountriesList>
        </section>
      )}
      {partialMatches.length === 0 && (
        <p className="text-preset-4-semibold">No similar countries found.</p>
      )}
    </div>
  );
};

export default CountrySearchPage;
