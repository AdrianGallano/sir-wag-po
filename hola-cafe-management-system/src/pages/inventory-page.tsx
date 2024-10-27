import { useEffect, useState } from "react";
import InventorySidebarComponent from "../components/inventory/inventory-sidebar/sidebar";
import ProductTable from "@/components/hcims/producttable";
import { useAuth } from "@/context/authContext";
import { Product } from "@/models/product";
import dataFetch from "@/services/data-service";

const InventoryPage = () => {
  const [filters, setFilters] = useState({ category: "", stockStatus: "" });

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

  const handleFilterChange = (filter: {
    category?: string;
    stockStatus?: string;
  }) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* This is the sidebar */}
      <InventorySidebarComponent onFilterChange={handleFilterChange} />

      <ProductTable products={products} />
      {/* Main inventory area */}
      {/* <MainInventory filters={filters} /> */}
    </div>
  );
};

export default InventoryPage;
