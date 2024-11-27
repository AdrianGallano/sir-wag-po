import { Category } from "./category";
import { Image } from "./image";

export default interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
  image: Image;
  category: Category;
}
