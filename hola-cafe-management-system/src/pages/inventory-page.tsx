import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Product } from "@/models/product";
import dataFetch from "@/services/data-service";
import MainInventory from "@/components/inventory/inventory-main-content/main-inventory";
import SearchInput from "@/components/search";
import HeaderCrud from "@/components/inventory/inventory-header/header-crud";

const InventoryPage = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = (await dataFetch(
          "api/products/",
          "GET",
          {},
          token!
        )) as Product[];
        setProducts(products);
        console.log("Fetched products:", products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <MainInventory />
    </div>
  );
};

export default InventoryPage;
