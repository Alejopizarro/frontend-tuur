import { Flag, Mail, PhoneCall } from "lucide-react";
import MenuList from "./menu-list";

const Navbar = () => {
  return (
    <nav className="flex justify-between absolute z-1000 w-full bg-transparent p-4">
      <h1 className="text-md">
        TUUR <span className="text-md font-semibold">Canyoning</span>
      </h1>
      <div className="items-center hidden sm:flex">
        <MenuList />
      </div>
      <div className="flex items-center gap-2 sm:gap-7">
        <Mail width={20} />
        <PhoneCall width={20} />
        <Flag width={20} />
      </div>
    </nav>
  );
};

export default Navbar;
