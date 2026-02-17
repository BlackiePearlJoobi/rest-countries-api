import { Country } from "../types/definitions";
import { redirect } from "next/navigation";
import BackButton from "../components/BackButton";
import CountriesList from "../components/CountriesList";
import Pagination from "../components/Pagination";

const CountrySearchPage = async ({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=cca3,flags,name,population,region,capital",
  );
  const countries: Country[] = await response.json();

  // Filter
  const query = (await searchParams).q?.toLowerCase() || "";
  const match = countries.find(
    (c) =>
      c.name.common.toLowerCase() === query || c.cca3.toLowerCase() === query,
  );

  if (match) {
    redirect(`/countries/${match.cca3}`);
  }

  const partialMatches = countries.filter((c) =>
    c.name.common.toLowerCase().includes(query),
  );

  // Pagination
  const page = Number((await searchParams).page) || 1;
  const itemsPerPage = 8;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = partialMatches.slice(start, end);

  return (
    <div className="mx-4 mt-10 sm:mx-10">
      <BackButton></BackButton>
      <h1 className="mt-8 text-preset-4-semibold">
        No exact match found for &quot;{query}&ldquo;
      </h1>
      {partialMatches.length > 0 && (
        <section>
          <p className="text-preset-4-light mb-6">
            Are you looking for the following countries?
          </p>
          <CountriesList list={paginated}></CountriesList>{" "}
          <Pagination
            page={page}
            total={partialMatches.length}
            itemsPerPage={itemsPerPage}
          ></Pagination>
        </section>
      )}
      {partialMatches.length === 0 && (
        <p className="text-preset-4-semibold">No similar countries found.</p>
      )}
    </div>
  );
};

export default CountrySearchPage;
