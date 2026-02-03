"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="w-26 h-8 box-light cursor-pointer dark:bg-(--blue-900) text-preset-5-light flex justify-center items-center gap-2 sm:w-34 sm:h-10 sm:text-preset-4-light"
      onClick={() => router.back()}
    >
      <span className="arrow-icon"></span>
      Back
    </button>
  );
};

export default BackButton;
