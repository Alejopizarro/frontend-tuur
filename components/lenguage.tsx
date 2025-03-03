import { FlagSpain } from "@/public/flag-spain";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Lenguage = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FlagSpain />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="flex items-center gap-x-2">
              <FlagSpain /> Español
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Français</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Lenguage;
