import { useState } from "react";
import InventorySidebarComponent from "../components/inventory/inventory-sidebar/sidebar";
import MainInventory from "@/components/inventory/inventory-main-content/main-inventory";

const InventoryPage = () => {
  const [filters, setFilters] = useState({ category: "", stockStatus: "" });

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

      {/* Main inventory area */}
      <MainInventory filters={filters} />
    </div>
  );
};

export default InventoryPage;
