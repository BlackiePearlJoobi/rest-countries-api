"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Switch = () => {
  const [isDark, setIsDark] = useState(false); // temporary initial value

  // Sync with <html> after hydration
  useEffect(() => {
    const htmlIsDark = document.documentElement.classList.contains("dark");
    setIsDark(htmlIsDark);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const nowDark = html.classList.toggle("dark"); // If .dark is present → remove it → returns false; If .dark is absent → add it → returns true; So nowDark is always the new theme state.

    setIsDark(nowDark);
    localStorage.theme = nowDark ? "dark" : "light";
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleDarkMode}
      className="flex items-center gap-2 cursor-pointer text-preset-6-semibold hover:text-(--gray-350) dark:hover:text-yellow-200 lg:text-preset-4-semibold lg:gap-[8.5px]"
    >
      <Image
        src={
          isDark
            ? `/assets/images/light-mode${isHovered ? "-hover.svg" : ".svg"}`
            : `/assets/images/dark-mode${isHovered ? "-hover.svg" : ".svg"}`
        }
        width={12}
        height={12}
        alt="dark mode switch"
        className="lg:w-3.75 lg:h-auto"
      ></Image>
      <p>{isDark ? "Light Mode" : "Dark Mode"}</p>
    </button>
  );
};

export default Switch;
