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
        setTotalProducts(products.length);
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
      {/* Header with Tabs */}
      <HeaderWrapper onLayoutChange={handleLayoutChange} />
      {/* Product List based on layout */}
      {layout === "horizontal" ? (
        <ProductTable
          products={paginatedProducts}
          suppliers={[]}
          categories={[]}
        />
      ) : (
        <InventoryProductVerticalCards products={paginatedProducts} />
      )}
      {/* should be at the bottom of the page and should displayed when there are 
      products*/}
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
    </div>
  );
};

export default MainInventory;
