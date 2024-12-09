import { Stock } from "@/models/stock";
import { TriangleAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StockNotificationDropdownProps {
  stocks: Stock[];
  trigger: React.ReactNode;
}

const StockNotificationDropdown = ({
  stocks,
  trigger,
}: StockNotificationDropdownProps) => {
  const lowStockItems = stocks.filter((item) => {
    const quantity = Number(item.quantity);
    return quantity > 0 && quantity <= 20;
  });

  const outOfStockItems = stocks.filter((item) => {
    const quantity = Number(item.quantity);
    return quantity <= 0;
  });

  const hasNotifications =
    lowStockItems.length > 0 || outOfStockItems.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          {hasNotifications && (
            <div className="absolute -top-.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
          {trigger}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 ml-4">
        <DropdownMenuGroup>
          {lowStockItems.length > 0 && (
            <DropdownMenuItem className="flex flex-col items-start gap-2 p-4">
              <div className="flex items-center gap-2 text-yellow-500">
                <TriangleAlert className="h-4 w-4" />
                <span className="font-semibold">Low Stock Items</span>
              </div>
              <ul className="ml-6 list-disc text-sm">
                {lowStockItems.map((item) => (
                  <li key={item.id}>
                    {item.name} ({item.quantity} remaining)
                  </li>
                ))}
              </ul>
            </DropdownMenuItem>
          )}

          {outOfStockItems.length > 0 && (
            <DropdownMenuItem className=" flex flex-col items-start gap-2 p-4">
              <div className="flex items-center gap-2 text-red-500">
                <TriangleAlert className="h-4 w-4" />
                <span className="font-semibold">Out of Stock Items</span>
              </div>
              <ul className="ml-6 list-disc text-sm">
                {outOfStockItems.map((item) => (
                  <li key={item.id}>
                    {item.name} ({item.quantity} remaining)
                  </li>
                ))}
              </ul>
            </DropdownMenuItem>
          )}

          {lowStockItems.length === 0 && outOfStockItems.length === 0 && (
            <DropdownMenuItem className="p-4">
              <span className="text-sm text-gray-500">No stock alerts</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StockNotificationDropdown;
