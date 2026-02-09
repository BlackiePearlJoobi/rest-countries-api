// Client component for URL manipulation (data fetching is server component)
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Pagination({
  page,
  total,
  itemsPerPage,
}: {
  page: number;
  total: number;
  itemsPerPage: number;
}) {
  const totalPages = Math.ceil(total / itemsPerPage);
  const pathname = usePathname(); // returns the current route path without query params (e.g., '/', '/country', etc.)
  const searchParams = useSearchParams(); // returns a ReadonlyURLSearchParams object, so you must use .get(), .has(), .entries(), etc.

  const createPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams); // URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters.
    params.set("page", String(newPage));
    return `${pathname}?${params.toString()}`;
    // The URL is updated without reloading the whole page.
  };

  return (
    <nav className="flex gap-4 justify-center mt-10">
      {page > 1 && (
        <Link
          href={createPageLink(page - 1)}
          className="cursor-pointer p-1 bg-gray-200 dark:bg-(--blue-900) rounded flex items-center"
        >
          Previous
        </Link>
      )}

      <span className="text-preset-5-light">
        Page <span className="text-preset-5-semibold">{page}</span> of{" "}
        <span className="text-preset-5-semibold">{totalPages}</span>
      </span>

      {page < totalPages && (
        <Link
          href={createPageLink(page + 1)}
          className="cursor-pointer p-1 bg-gray-200 dark:bg-(--blue-900) rounded flex items-center"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
