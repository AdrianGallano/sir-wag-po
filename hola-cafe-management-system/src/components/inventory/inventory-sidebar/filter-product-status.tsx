import React from 'react'
import { products } from '../models/products'

const FilterProductStatus = () => {
  // function on counting products
  const onProductCount = () => {
    return products.length
  }

  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold">PRODUCT STATUS</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>All</span>
          <span className=" px-2 py-1 rounded-full">{onProductCount()}</span>
        </button>
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>Active</span>
          <span className=" px-2 py-1 rounded-full">{onProductCount()}</span>
        </button>
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>Inactive</span>
          <span className=" px-2 py-1 rounded-full">{onProductCount()}</span>
        </button>
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>Draft</span>
          <span className=" px-2 py-1 rounded-full">{onProductCount()}</span>
        </button>
      </div>
    </div>
  )
}

export default FilterProductStatus