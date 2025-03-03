import { ShoppingCart } from "lucide-react";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import Lenguage from "./lenguage";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center absolute z-1000 w-full bg-transparent p-4">
      <h1 className="text-md">
        TUUR <span className="text-md font-semibold">Canyoning</span>
      </h1>
      <div className="items-center hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex gap-x-8 sm:hidden">
        <Lenguage />
        <ItemsMenuMobile />
      </div>
      <div className="items-center gap-2 sm:gap-7 hidden sm:flex">
        <Lenguage />
        <ShoppingCart width={20} />
      </div>
    </nav>
  );
};

export default Navbar;
