import React from 'react'

//imported components
import FilterProductStatus from './filter-product-status'
import FilterProductType from './filter-product-type'
import FilterProductSorting from './filter-product-sorting'
import FilterProductStock from './filter-product-stock'
import FilterProductCategory from './filter-product-category'
import FilterProductPrice from './filter-product-price'
import FIlterReset from './filter-product-reset'


const SidebarFilter = () => {
  return (
    <div className="p-4 bg-gray-900 text-white">
      {/* Product Status */}
      <FilterProductStatus/>
      {/* Product Type */}
      <FilterProductType/>
      {/* Sorting */}
      <FilterProductSorting/>
      {/* Stock */}
      <FilterProductStock/>
      {/* Category */}
      <FilterProductCategory/>
      {/* Price */}
      <FilterProductPrice/>
      {/* Reset Filter */}
      <FIlterReset/>
    </div>
  )
}

export default SidebarFilter