"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="flex justify-between">
      <h1>
        <Link href="/">Where in the world?</Link>
      </h1>
      <button
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-2 cursor-pointer"
      >
        <Image
          src={`/assets/images/dark-mode${isHovered ? "-hover.svg" : ".svg"}`}
          width={12}
          height={12}
          alt="dark mode switch"
        ></Image>
        <p>Dark Mode</p>
      </button>
    </header>
  );
};

export default Header;
