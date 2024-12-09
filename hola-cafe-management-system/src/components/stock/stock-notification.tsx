import { Stock } from "@/models/stock";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

export const checkLowStockLevels = (stocks: Stock[]) => {
  const lowStockItems = stocks.filter((item) => {
    const quantity = Number(item.quantity);
    return quantity > 0 && quantity <= 20;
  });

  if (lowStockItems.length > 0) {
    if (lowStockItems.length === 1) {
      toast.warning(
        `Low stock alert: ${lowStockItems[0].name} (${lowStockItems[0].quantity} remaining)`,
        {
          duration: 4000,
        }
      );
      return;
    }

    toast.warning(
      <div>
        <p className="font-semibold">Multiple items are running low:</p>
        <ul className="mt-2 list-disc list-inside">
          {lowStockItems.map((item) => (
            <li key={item.id}>
              {item.name} ({item.quantity} remaining)
            </li>
          ))}
        </ul>
      </div>,
      {
        duration: 3500,
      }
    );
  }
};
export const checkOutOfStockLevels = (stocks: Stock[]) => {
  const outOfStock = stocks.filter((item) => {
    const quantity = Number(item.quantity);
    return quantity <= 0;
  });

  if (outOfStock.length > 0) {
    if (outOfStock.length === 1) {
      toast(
        `Out stock alert: ${outOfStock[0].name} (${outOfStock[0].quantity} remaining)`,
        {
          duration: 3500,
          className: "text-red-500 bg-white",
          icon: <TriangleAlert className="h-5 w-5 fill-red-500 text-white" />,
        }
      );
      return;
    }

    toast(
      <div>
        <p className="font-semibold">Multiple items are running low:</p>
        <ul className="mt-2 list-disc list-inside">
          {outOfStock.map((item) => (
            <li key={item.id}>
              {item.name} ({item.quantity} remaining)
            </li>
          ))}
        </ul>
      </div>,
      {
        duration: 3500,
        className: "text-red-500 bg-white",
        icon: (
          <TriangleAlert className="h-[22px] w-[22px] fill-red-500 text-white" />
        ),
      }
    );
  }
};
