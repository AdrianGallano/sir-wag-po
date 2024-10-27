import React, { useState, useEffect } from "react";
import InventoryProductVerticalCards from "./Product-list/inventory-product-verticalcards";
import HeaderWrapper from "../inventory-header/header-wrapper";
import { Product } from "@/models/product";
import ProductTable from "@/components/hcims/producttable";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";

const MainInventory = () => {
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [filters, setFilters] = useState({ category: "", stockStatus: "" });

  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  // Allowing the layout to be changed based on tab value
  const handleLayoutChange = (selectedLayout: string) => {
    // Casting string to "horizontal" | "vertical"
    if (selectedLayout === "horizontal" || selectedLayout === "vertical") {
      setLayout(selectedLayout);
    }
  };

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
    <div className="flex-1 flex flex-col bg-white">
      {/* Header with Tabs */}
      <HeaderWrapper onLayoutChange={handleLayoutChange} />
      {/* Product List based on layout */}
      {layout === "horizontal" ? (
        <ProductTable products={products} />
      ) : (
        <InventoryProductVerticalCards products={products}/>
      )}
    </div>
  );
};

export default MainInventory;
