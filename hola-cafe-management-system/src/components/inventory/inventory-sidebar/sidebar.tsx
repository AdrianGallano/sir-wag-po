import React from 'react'

//imported components
import SidebarHeader from './sidebar-header'
import SidebarFilter from './sidebar-filter'

const InventorySidebarComponent = () => {
  return (
    <div className="w-72 bg-white border-r-2  p-4 text-white flex flex-col">
      <SidebarHeader />
      <SidebarFilter />
    </div>
  )
}

export default InventorySidebarComponent