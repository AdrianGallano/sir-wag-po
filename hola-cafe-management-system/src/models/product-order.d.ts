import Product from "./product";
import Transaction from "./transaction";

export interface ProductOrder {
  id: number;
  product: Product;
  transaction: Transaction;
  quantity: number;
  created_at: string;
  updated_at: string;
}
