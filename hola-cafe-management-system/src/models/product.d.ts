import { Category } from "./category";
import { Supplier } from "./supplier";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: string;
  cost_price: string;
  created_at: string;
  updated_at: string;
  user: number;
  category: Category;
  supplier: Supplier;
  image?: string;
}
