import React from 'react'

//imported components
import InventoryProductCards from './inventory-product-cards'
import HeaderWrapper from './inventory-header/header-wrapper'

const MainInventory = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <HeaderWrapper />
        {/* Product List */}
        <InventoryProductCards />
    </div>
  )
}

export default MainInventory