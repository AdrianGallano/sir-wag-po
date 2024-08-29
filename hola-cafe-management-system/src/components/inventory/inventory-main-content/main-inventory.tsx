import React from 'react'

//imported components
import InventoryProductHorizontalCards from './Product-list/inventory-product-horizontalcards'
import InventoryProductVerticalCards from './Product-list/inventory-product-verticalcards'
import HeaderWrapper from './inventory-header/header-wrapper'

const MainInventory = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <HeaderWrapper />
        {/* Product List */}
        <InventoryProductHorizontalCards />
        <InventoryProductVerticalCards />
    </div>
  )
}

export default MainInventory