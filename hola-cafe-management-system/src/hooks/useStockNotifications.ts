import { useEffect, useRef } from "react";
import { useStock } from "@/context/stockContext";
import { checkLowStockLevels } from "@/components/stock/stock-notification";

export const useStockNotifications = (checkIntervalMinutes = 60) => {
  const { stock } = useStock();
  const intervalRef = useRef<number>();

  useEffect(() => {
    // Initial check
    checkLowStockLevels(stock);

    // Set up periodic checks
    intervalRef.current = window.setInterval(() => {
      checkLowStockLevels(stock);
    }, checkIntervalMinutes * 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stock, checkIntervalMinutes]);
};
