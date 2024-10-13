import React from 'react';
import FilterProductStatus from './filter-product-status';
import FilterProductType from './filter-product-type';
import FilterProductDropdown from './FilterProductDropdown';
import FilterProductPrice from './filter-product-price';
import FIlterReset from './filter-product-reset';

interface FilterProps {
  onFilterChange: (filter: { category?: string; stockStatus?: string }) => void;
}

const SidebarFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  return (
    <div className="p-4 bg-white text-black">
      {/* Product Status */}
      {/* <FilterProductStatus/> */}
      {/* Product Type */}
      {/* <FilterProductType/> */}
      {/* Dropdowns */}
      <FilterProductDropdown onFilterChange={onFilterChange}/>
      {/* price */}
      {/* <FilterProductPrice/> */}
      {/* Reset Filter */}
      {/* <FIlterReset onReset={() => onFilterChange({ category: '', stockStatus: '' })} /> */}
    </div>
  )
}

export default SidebarFilter;
