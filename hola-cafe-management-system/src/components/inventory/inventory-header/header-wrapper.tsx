import React from 'react';
import { Grid2X2, List } from 'lucide-react';
import SearchInput from '@/components/search';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderCrud from './header-crud';

interface HeaderWrapperProps {
  onLayoutChange: (layout: string) => void;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ onLayoutChange }) => {
  return (
    <div className='flex items-center space-x-4 w-full mb-4 pl-2 pr-2'>
      {/* Search input */}
      <div className="relative flex-grow">
        <SearchInput />
      </div>

      {/* Tabs for layout selection */}
      <Tabs defaultValue="horizontal" className="w-auto" onValueChange={onLayoutChange}>
        <TabsList >
          <TabsTrigger value="horizontal">
            <List />
          </TabsTrigger>
          <TabsTrigger value="vertical">
            <Grid2X2 />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Header CRUD actions */}
      <div className="ml-4">
        <HeaderCrud />
      </div>
    </div>
  );
};

export default HeaderWrapper;
