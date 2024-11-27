import { Category } from "./category";
import { Image } from "./image";
import ServiceCrew from "./service_crew";
import { Supplier } from "./supplier";

export interface Stock {
  id: number;
  name: string;
  description: string;
  quantity: string;
  cost_price: string;
  created_at: string;
  updated_at: string;
  expiration_date: string;
  supplier: Supplier;
  image?: Image;
  onEdit: (product: Stock) => void;
  onDelete: (product: Stock) => void;
}
