import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-black">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="bg-[#fbdb06] text-white font-bold px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-black bg-white p-5 w-60 text-wrap text-justify whitespace-nowrap ">
              Let's be honest though -- 99% of the time, the 404 page is the
              fault of the person who made the website. We probably broke a link
              somewhere when working on a page.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <button className="mt-5">
        <a href="/" className="relative inline-block text-sm font-medium text-[#fbdb06] group active:text-yellow-700 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#fbdb06] group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3  bg-gray-50 border border-current">
            Go Home
          </span>
        </a>
      </button>
    </main>
  );
};

export default PageNotFound;
