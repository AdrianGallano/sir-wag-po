import React from "react";
import FilterProductStatus from "./filter-product-status";
import FilterProductType from "./filter-product-type";
import FilterProductDropdown from "./FilterProductDropdown";
import FilterProductPrice from "./filter-product-price";
import FIlterReset from "./filter-product-reset";

interface FilterProps {
  onFilterChange: (filter: { category?: string; stockStatus?: string }) => void;
}

const SidebarFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <div className="h-fit px-4 py-6 bg-white text-black border border-gray-500 rounded-md">
      {/* Product Status */}
      <FilterProductStatus />
      {/* Product Type */}
      <FilterProductType />
      {/* Dropdowns */}
      <FilterProductDropdown onFilterChange={onFilterChange} />
      {/* price */}
      <FilterProductPrice />
      {/* Reset Filter */}
      <FIlterReset
        onReset={() => onFilterChange({ category: "", stockStatus: "" })}
      />
    </div>
  );
};

export default SidebarFilter;
