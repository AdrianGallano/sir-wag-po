import { useState, useEffect } from "react";
import InventoryProductVerticalCards from "./Product-list/inventory-product-verticalcards";
import HeaderWrapper from "../inventory-header/header-wrapper";
import { Product } from "@/models/product";
import ProductTable from "@/components/hcims/producttable";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MainInventory = () => {
  // state
  const [layout, setLayout] = useState<"horizontal" | "vertical">("horizontal");
  const [filters, setFilters] = useState({ category: "", stockStatus: "" });
  const [products, setProducts] = useState<Product[]>([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 12;

  // context
  const { token } = useAuth();

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const products = (await dataFetch(
        "api/products/",
        "GET",
        {},
        token!
      )) as Product[];
      setProducts(products);
      setTotalProducts(products.length);
      console.log("Products fetched", products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  // useEffect to fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLayoutChange = (selectedLayout: string) => {
    if (selectedLayout === "horizontal" || selectedLayout === "vertical") {
      setLayout(selectedLayout);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter: {
    category?: string;
    stockStatus?: string;
  }) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...filter }));
  };

  // slicing the products based on the current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className="flex-1 flex flex-col bg-white p-2">
      <HeaderWrapper onLayoutChange={handleLayoutChange} onProductCreated={fetchProducts} />
      <div className="flex-grow">
        {layout === "horizontal" ? (
          <ProductTable
            products={paginatedProducts}
            suppliers={[]}
            categories={[]}
            onproductUpdated={fetchProducts} // Pass the callback
            onproductDeleted={fetchProducts} // Pass the callback
          />
        ) : (
          <InventoryProductVerticalCards
            products={paginatedProducts}
            suppliers={[]}
            categories={[]}
            onproductDeleted={fetchProducts} // Pass the callback
            onproductUpdated={fetchProducts} // Pass the callback
          />
        )}
      </div>
      {totalProducts > 0 && (
        <Pagination className="my-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer active:bg-custom-paleButter"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className="cursor-pointer active:bg-custom-paleButter"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer active:bg-custom-paleButter"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default MainInventory;
