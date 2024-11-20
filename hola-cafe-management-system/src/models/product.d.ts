import { Category } from "./category";
import { Image } from "./image";
import { Supplier } from "./supplier";

export interface Product {
  image_id: any;
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: string;
  cost_price: string;
  created_at: string;
  updated_at: string;
  expiration_date: string;
  user: number;
  category: Category;
  supplier: Supplier;
  image?: Image;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}
