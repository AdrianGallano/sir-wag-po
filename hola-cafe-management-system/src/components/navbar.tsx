import { Coffee, LineChart, Blocks, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";

const Navbar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-custom-yellow sm:flex rounded-tr-lg rounded-br-lg">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <a className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-custom-night text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <Coffee className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Learning Buddy</span>
        </a>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/analytics"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-custom-night text-black transition-colors md:h-8 md:w-8 hover:bg-custom-night hover:text-white cursor-pointer"
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/inventory"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-custom-night text-black transition-colors md:h-8 md:w-8 hover:bg-custom-night hover:text-white cursor-pointer"
              >
                <Blocks className="h-5 w-5" />
                <span className="sr-only">Inventory</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Inventory</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a className="flex h-9 w-9 items-center justify-center rounded-lg border border-custom-night text-black transition-colors md:h-8 md:w-8 hover:bg-custom-night hover:text-white cursor-pointer">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Navbar;
