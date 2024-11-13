import PosHeader from '@/components/pos/header';
import PosMenus from '@/components/pos/menus';
import PosTransaction from '@/components/pos/transaction';
import React from 'react';

const PosPage = () => {
  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <PosHeader/>
        {/* Item list */}
        <PosMenus/>
      </div>
        {/* Transaction Panel */}
        <PosTransaction/> 
    </div>
  );
};

export default PosPage;
