import { useEffect, useRef } from "react";
import { useStock } from "@/context/stockContext";
import {
  checkLowStockLevels,
  checkOutOfStockLevels,
} from "@/components/stock/stock-notification";

export const useStockNotifications = (checkIntervalMinutes = 60) => {
  const { stock } = useStock();
  const intervalRef = useRef<number>();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (!hasCheckedRef.current && stock.length > 0) {
      checkLowStockLevels(stock);
      checkOutOfStockLevels(stock);
      hasCheckedRef.current = true;
    }

    intervalRef.current = window.setInterval(() => {
      checkLowStockLevels(stock);
      checkOutOfStockLevels(stock);
    }, checkIntervalMinutes * 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stock, checkIntervalMinutes]);
};
