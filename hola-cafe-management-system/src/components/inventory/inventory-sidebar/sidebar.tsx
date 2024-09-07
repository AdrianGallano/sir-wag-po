import React from 'react';
import SidebarHeader from './sidebar-header';
import SidebarFilter from './sidebar-filter';

interface SidebarComponentProps {
  onFilterChange: (filter: { category?: string; stockStatus?: string }) => void;
}

const InventorySidebarComponent: React.FC<SidebarComponentProps> = ({ onFilterChange }) => {
  return (
    <div className="w-72 bg-white border-r-2  p-4 text-white flex flex-col">
      <SidebarHeader />
      <SidebarFilter onFilterChange={onFilterChange} />
    </div>
  );
}

export default InventorySidebarComponent;
