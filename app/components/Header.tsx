import Link from "next/link";
import Switch from "./Switch";

const Header = () => {
  return (
    <header className="sticky top-0 h-20 px-4 py-7.5 bg-(--white) shadow-md flex justify-between items-center sm:px-10.25">
      <h1 className="font-extrabold leading-5 lg:text-preset-2">
        <Link href="/">Where in the world?</Link>
      </h1>
      <Switch></Switch>
    </header>
  );
};

export default Header;
