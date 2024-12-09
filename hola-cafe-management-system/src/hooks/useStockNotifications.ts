import { useEffect, useRef } from "react";
import { useStock } from "@/context/stockContext";

export const useStockNotifications = (checkIntervalMinutes = 60) => {
  const { stock } = useStock();
  const intervalRef = useRef<number>();
  const previousStockRef = useRef<string>("");
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const currentStockString = JSON.stringify(stock);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only update the previous stock reference when stock changes
    if (previousStockRef.current !== currentStockString && stock.length > 0) {
      previousStockRef.current = currentStockString;
    }

    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval - but don't show notifications
    intervalRef.current = window.setInterval(() => {
      // Removed notification checks
      // Just keep track of stock changes
    }, checkIntervalMinutes * 60 * 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [stock, checkIntervalMinutes]);
};
