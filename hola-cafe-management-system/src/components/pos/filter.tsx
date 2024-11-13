import React from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';

const PosFilter = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Filter by Category</h2>
      <Tabs defaultValue="all" className='w-[427px] bg-colo'>
        <TabsList className="flex space-x-2 justify-start">
          <TabsTrigger 
            value="all" 
            className="px-4 py-2 border border-black rounded-md font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
          >
            All <span className="font-bold ml-1">27</span>
          </TabsTrigger>
          <TabsTrigger 
            value="bread" 
            className="px-4 py-2 border border-black rounded-md font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
          >
            Bread <span className="font-bold ml-1">10</span>
          </TabsTrigger>
          <TabsTrigger 
            value="beverages" 
            className="px-4 py-2 border border-black rounded-md font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
          >
            Beverages <span className="font-bold ml-1">20</span>
          </TabsTrigger>
          <TabsTrigger 
            value="meals" 
            className="px-4 py-2 border border-black rounded-md font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
          >
            Meals <span className="font-bold ml-1">40</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PosFilter;
