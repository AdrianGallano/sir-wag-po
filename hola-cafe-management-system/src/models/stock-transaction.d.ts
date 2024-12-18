import ServiceCrew from "./service_crew";
import { Stock } from "./stock";

export interface StockTransaction {
  id: number;
  service_crew: ServiceCrew;
  created_at: string;
  updated_at: string;
  stock_used: StockUsed[];
}

export interface StockUsed {
  id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  stock_transaction: StockTransactionReference;
  stock: Stock;
}

export interface StockTransactionReference {
  id: number;
  created_at: string;
  updated_at: string;
  service_crew: number;
}
