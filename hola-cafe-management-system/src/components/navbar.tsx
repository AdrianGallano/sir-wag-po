import {
  Coffee,
  Computer,
  LineChart,
  LogOut,
  Package,
  ReceiptText,
  Tag,
  Truck,
  Warehouse,
  LayoutDashboard,
  LaptopMinimal,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { useStock } from "@/context/stockContext";
import StockNotificationDropdown from "./stock/stock-notification-dropdown";

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const { stock } = useStock();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="fixed inset-y-0 left-1 top-1 bottom-1 z-10 hidden w-14 flex-col border-r bg-custom-char  rounded-full sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <StockNotificationDropdown
          stocks={stock}
          trigger={
            <a className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-custom-sunnyGold text-lg font-semibold text-custom-charcoalOlive md:h-8 md:w-8 md:text-base cursor-pointer">
              <Coffee className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Hola Cafe</span>
            </a>
          }
        />
        {/* <a className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-custom-sunnyGold text-lg font-semibold text-custom-charcoalOlive md:h-8 md:w-8 md:text-base">
          <Coffee className="h-4 w-4 transition-all group-hover:scale-110 " />
          <span className="sr-only">Hola Cafe</span>
        </a> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard"
                className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                  location.pathname === "/dashboard"
                    ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                    : "bg-transparent text-muted-foreground hover:text-white"
                }`}
              >
                <LayoutDashboard className="h-4 w-4 transition-all group-hover:scale-110 " />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/pos"
                className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                  location.pathname === "/pos"
                    ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                    : "bg-transparent text-muted-foreground hover:text-white"
                }`}
              >
                <Computer className="h-4 w-4 transition-all group-hover:scale-110 " />
                <span className="sr-only">Point of sale</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Point of sale</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/stockpos"
                  className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                    location.pathname === "/stockpos"
                      ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                      : "bg-transparent text-muted-foreground hover:text-white"
                  }`}
                >
                  <LaptopMinimal className="h-4 w-4 transition-all group-hover:scale-110 " />
                  <span className="sr-only">Stock Expenditure</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Stock Expenditure</TooltipContent>
            </Tooltip>
          </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/analytics"
                className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                  location.pathname === "/analytics"
                    ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                    : "bg-transparent text-muted-foreground hover:text-white"
                }`}
              >
                <LineChart className="h-4 w-4 transition-all group-hover:scale-110 " />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="my-6 flex flex-col gap-1.5 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/inventory"
                  className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                    location.pathname === "/inventory"
                      ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                      : "bg-transparent text-muted-foreground hover:text-white"
                  }`}
                >
                  <Warehouse className="h-4 w-4 transition-all group-hover:scale-110 " />
                  <span className="sr-only">Inventory</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Inventory</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/product"
                  className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                    location.pathname === "/product"
                      ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                      : "bg-transparent text-muted-foreground hover:text-white"
                  }`}
                >
                  <Package className="h-4 w-4 transition-all group-hover:scale-110 " />
                  <span className="sr-only">Product</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Product</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/transaction"
                  className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                    location.pathname === "/transaction"
                      ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                      : "bg-transparent text-muted-foreground hover:text-white"
                  }`}
                >
                  <ReceiptText className="h-4 w-4 transition-all group-hover:scale-110 " />
                  <span className="sr-only">Transaction</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Transaction</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/supplier"
                  className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                    location.pathname === "/supplier"
                      ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                      : "bg-transparent text-muted-foreground hover:text-white"
                  }`}
                >
                  <Truck className="h-4 w-4 transition-all group-hover:scale-110 " />
                  <span className="sr-only">Supplier</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Supplier</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/categories"
                  className={`group flex h-9 w-9 items-center justify-center rounded-full -colors  md:h-8 transition md:w-8 ${
                    location.pathname === "/categories"
                      ? "bg-custom-sunnyGold text-custom-charcoalOlive "
                      : "bg-transparent text-muted-foreground hover:text-white"
                  }`}
                >
                  <Tag className="h-4 w-4 transition-all group-hover:scale-110 " />
                  <span className="sr-only">Category</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Category</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="group flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-white md:h-8 md:w-8"
              >
                <LogOut className="h-4 w-4 transition-all group-hover:scale-110 " />
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
