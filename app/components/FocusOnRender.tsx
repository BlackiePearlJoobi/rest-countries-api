"use client";

import { useEffect, useRef } from "react";

const FocusOnRender = ({
  currentPage,
  children,
}: {
  currentPage: number;
  children: React.ReactNode;
}) => {
  const countriesListWrapperRef = useRef<HTMLDivElement>(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false; // mark initial load
      return; // skip focusing on first load
    }

    const firstCountry =
      countriesListWrapperRef.current?.querySelector<HTMLElement>(
        "[data-focus-target]",
      );

    firstCountry?.focus();
  }, [currentPage]);

  return <div ref={countriesListWrapperRef}>{children}</div>;
};

export default FocusOnRender;
