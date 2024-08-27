import React from 'react'

//imported components
import SidebarHeader from './sidebar-header'
import SidebarFilter from './sidebar-filter'

const InventorySidebarComponent = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <SidebarHeader />
      <SidebarFilter />
    </div>
  )
}

export default InventorySidebarComponent