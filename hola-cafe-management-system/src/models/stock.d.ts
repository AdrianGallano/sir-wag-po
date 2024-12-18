import { Category } from "./category";
import { Image } from "./image";
import ServiceCrew from "./service_crew";
import { Supplier } from "./supplier";

export interface Stock {
  id: number;
  name: string;
  description: string;
  quantity: string;
  unit_price: string;
  created_at: string;
  updated_at: string;
  expiration_date: string;
  is_expired: boolean;
  date_shelved: string;
  supplier: Supplier;
  status: string;
  image?: Image;
  is_stocked_by: ServiceCrew;
  onEdit: (product: Stock) => void;
  onDelete: (product: Stock) => void;
}
