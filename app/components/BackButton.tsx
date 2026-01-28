"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex gap-2 cursor-pointer"
      onClick={() => router.back()}
    >
      <Image
        src={`../assets/images/arrow-light.svg`}
        width={16.97}
        height={16.97}
        alt=""
      ></Image>{" "}
      Back
    </button>
  );
};

export default BackButton;
