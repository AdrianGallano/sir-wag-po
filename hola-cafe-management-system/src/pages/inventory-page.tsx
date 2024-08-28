import React from 'react'

//imported components
import InventorySidebarComponent from '../components/inventory/inventory-sidebar/sidebar'
import MainInventory from '@/components/inventory/inventory-main-content/main-inventory';

const InventoryPage = () => {
    return (
      <div className="flex min-h-screen bg-white">
      {/* This is the sidebar */}
      <InventorySidebarComponent />
      {/* Main inventory area */}
      <MainInventory />
    </div>
      );
    }
    

export default InventoryPage