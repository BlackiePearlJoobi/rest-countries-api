// Client component for URL manipulation (data fetching is server component)
"use client";

import { usePathname, useSearchParams } from "next/navigation"; // client‑only hooks
import Link from "next/link";
import clsx from "clsx";

export default function Pagination({
  currentPage,
  total,
  itemsPerPage,
}: {
  currentPage: number;
  total: number;
  itemsPerPage: number;
}) {
  const totalPages = Math.ceil(total / itemsPerPage);
  const pathname = usePathname(); // returns the current route path without query params (e.g., '/', '/country', etc.)
  const searchParams = useSearchParams(); // returns an immutable ReadonlyURLSearchParams object that would look like: {page: '1', region: 'Americas'}
  const allPages = generatePagination(currentPage, totalPages); //array

  const createPageLink = (newPage: number | string): string => {
    const params = new URLSearchParams(searchParams); // creates a mutable clone and provides utility methods for manipulating the URL query parameters
    params.set("page", String(newPage));
    return `${pathname}?${params.toString()}`; // would look like "/?region=Asia&page=2"
    // The URL is updated without reloading the whole page
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap gap-4 justify-center mt-10"
    >
      {currentPage > 1 && (
        <PaginationArrow
          href={createPageLink(currentPage - 1)}
          direction="left"
        ></PaginationArrow>
      )}

      <ul className="flex -space-x-px list-none">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageLink(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </ul>

      {currentPage < totalPages && (
        <PaginationArrow
          href={createPageLink(currentPage + 1)}
          direction="right"
        ></PaginationArrow>
      )}
    </nav>
  );
}

const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less, display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages, show the first 3, an ellipsis, and the last page.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  // If the current page is among the last 3 pages, show the first page, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle, show the first page, an ellipsis, the current page and its neighbors, another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

const PaginationArrow = ({
  href,
  direction,
}: {
  href: string;
  direction: "left" | "right";
}) => {
  return (
    <Link
      href={href}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
      className="h-10 w-10 flex items-center justify-center rounded-md cursor-pointer border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      <span
        aria-hidden="true"
        className={`arrow-svg ${direction === "left" ? "arrow-left" : "arrow-right"}`}
      ></span>
    </Link>
  );
};

const PaginationNumber = ({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) => {
  const className = clsx(
    "h-10 w-10 flex items-center justify-center border border-gray-300 dark:border-gray-600",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-gray-500 border-gray-400 text-white": isActive,
      "hover:bg-gray-300 dark:hover:bg-gray-600":
        !isActive && position !== "middle",
      "border-t-0 border-b-0": position === "middle",
    },
  );

  return (
    <li>
      {isActive ? (
        <div aria-current="page" className={className}>
          {page}
        </div>
      ) : position === "middle" ? (
        // Prevent screen readers from announcing “dot dot dot”
        <div aria-hidden="true" className={className}>
          {page}
        </div>
      ) : (
        <Link
          href={href}
          aria-label={`Go to page ${page}`}
          className={className}
        >
          {page}
        </Link>
      )}
    </li>
  );
};
