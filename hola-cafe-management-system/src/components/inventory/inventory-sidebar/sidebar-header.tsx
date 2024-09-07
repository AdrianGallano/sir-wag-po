import React from 'react'
import { products } from '../models/products'

const SidebarHeader = () => {

  // function for counting products
  const onProductCount = () => {
    return products.length
  }
  return (
    <div className="w-full p-0 bg-white text-black flex flex-ro align-middle justify-center mb-4">
      <h2 className="text-2xl font-semibold">Product</h2>
      <p className="text-sm text-black flex align-middle ml-11 mt-2">{onProductCount()}</p>
    </div>
  )
}

export default SidebarHeader