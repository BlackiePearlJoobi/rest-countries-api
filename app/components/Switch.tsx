"use client";

import { useState } from "react";
import Image from "next/image";

const Switch = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-2 cursor-pointer lg:gap-[8.5px]"
    >
      <Image
        src={`/assets/images/dark-mode${isHovered ? "-hover.svg" : ".svg"}`}
        width={12}
        height={12}
        alt="dark mode switch"
        className="lg:w-3.75 lg:h-auto"
      ></Image>
      <p className="text-preset-6-semibold hover:text-(--gray-300)  lg:text-preset-4-semibold">
        Dark Mode
      </p>
    </button>
  );
};

export default Switch;
