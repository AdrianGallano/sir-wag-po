import React from 'react'

//imported components
import HeaderSearchbar from '../inventory-header/header-searchbar'
import HeaderWrapper from '../inventory-header/header-wrapper'

const MainInventory = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <HeaderWrapper />
        {/* Product List */}
        <section className="flex-1 p-4 overflow-y-auto">
          {/* Product list content */}
        </section>
    </div>
  )
}

export default MainInventory