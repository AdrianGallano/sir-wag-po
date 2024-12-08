import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Stock } from "@/models/stock";
import { useAuth } from "./authContext";
import dataFetch from "@/services/data-service";
import { checkLowStockLevels } from "@/components/stock/stock-notification";

interface StockContextType {
  stock: Stock[];
  setStock: React.Dispatch<React.SetStateAction<Stock[]>>;
  fetchStocks: () => Promise<void>;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [stock, setStock] = useState<Stock[]>([]);
  const { token } = useAuth();

  const fetchStocks = async () => {
    try {
      const stocks = (await dataFetch(
        "api/image/is-stocked-by/supplier/stock/",
        "GET",
        {},
        token!
      )) as Stock[];
      setStock(stocks.reverse());
      checkLowStockLevels(stocks);
    } catch (error) {
      console.error("Failed to fetch stocks", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStocks();
    }
  }, [token]);

  return (
    <StockContext.Provider value={{ stock, setStock, fetchStocks }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
}
