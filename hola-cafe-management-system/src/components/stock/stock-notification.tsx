import { Stock } from "@/models/stock";
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
        duration: 6000,
      }
    );
  }
};
