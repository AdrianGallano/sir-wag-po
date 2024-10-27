import { Coffee, LineChart, LogOut, Warehouse } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-[#f7d327] rounded-tr-md rounded-br-md sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <a className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-[#504c41] text-lg font-semibold text-[#feed9f] md:h-8 md:w-8 md:text-base">
          <Coffee className="h-4 w-4 transition-all group-hover:scale-110 " />
          <span className="sr-only">Hola Cafe</span>
        </a>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/analytics"
                className={`flex h-9 w-9 items-center justify-center rounded-lg -colors  md:h-8 transition md:w-8 ${
                  location.pathname === "/analytics"
                    ? "bg-[#504c41] text-[#feed9f] hover:text-[#f7d327]"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/inventory"
                className={`flex h-9 w-9 items-center justify-center rounded-lg -colors  md:h-8 transition md:w-8 ${
                  location.pathname === "/inventory"
                    ? "bg-[#504c41] text-[#feed9f] hover:text-[#f7d327]"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Warehouse className="h-5 w-5" />
                <span className="sr-only">Inventory</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Inventory</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Navbar;
