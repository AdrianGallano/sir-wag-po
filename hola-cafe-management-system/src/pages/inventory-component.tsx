import React from 'react'

//imported components
import InventorySidebarComponent from '../components/inventory/inventory-sidebar/sidebar'

const InventoryComponent = () => {
    return (
      <div className="flex min-h-screen bg-gray-800">
      {/* This is the sidebar */}
      <InventorySidebarComponent />
      <div className="flex-1 flex flex-col bg-gray-800">
        {/* Header */}
        <header className="p-4 bg-gray-800 border-b border-gray-700">
          {/* Header content */}
        </header>

        {/* Product List */}
        <section className="flex-1 p-4 overflow-y-auto">
          {/* Product list content */}
        </section>
      </div>
    </div>
      );
    }
    

export default InventoryComponent