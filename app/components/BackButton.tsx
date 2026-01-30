"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="w-26 h-8 box-light cursor-pointer text-preset-5-light flex justify-center items-center gap-2 sm:w-34 sm:h-10 sm:text-preset-4-light"
      onClick={() => router.back()}
    >
      <Image
        src={`../assets/images/arrow-light.svg`}
        width={16.97}
        height={16.97}
        alt=""
      ></Image>
      Back
    </button>
  );
};

export default BackButton;
