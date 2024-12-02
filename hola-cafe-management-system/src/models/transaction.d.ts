import { ProductOrder } from "./product-order";
import ServiceCrew from "./service_crew";

export default interface Transaction {
  id: number;
  total_price: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  service_crew: ServiceCrew;
  product_orders: ProductOrder[];
}
