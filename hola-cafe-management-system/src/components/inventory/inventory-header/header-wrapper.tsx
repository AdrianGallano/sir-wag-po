import React from 'react';
import { Grid2X2, List } from 'lucide-react';
import SearchInput from '@/components/search';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderCrud from './header-crud';
import CreateProducts from '../popup/CreateProducts';
import dataFetch from '@/services/data-service';
import { Product } from '../models/products-interface';

interface HeaderWrapperProps {
  onLayoutChange: (layout: string) => void;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ onLayoutChange }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);

  const handlePopup = (selectedPopup: "open" | "close") => {
    setIsPopupOpen(selectedPopup === "open");
  };

  // Function to handle Create product
  const handleProductSubmit = async (productData: Product) => {
    try {
        const endpoint = '/api/products/';
        const token = localStorage.getItem('token') || undefined;

        const response = await dataFetch(endpoint, 'POST', productData, token); // Include token in the request
        console.log('Product saved:', response);
        setIsPopupOpen(false); 
    } catch (error) { // Error handling
        console.error("Error saving product:", error);
        console.log('Product not saved:', productData);
    }
};

  return (
    <div className='flex items-center space-x-4 w-full mb-4 pl-2 pr-2'>
      <div className="relative flex-grow">
        <SearchInput />
      </div>

      <Tabs defaultValue="horizontal" className="w-auto" onValueChange={onLayoutChange}>
        <TabsList>
          <TabsTrigger value="horizontal">
            <List />
          </TabsTrigger>
          <TabsTrigger value="vertical">
            <Grid2X2 />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="ml-4">
        <HeaderCrud onOpenPopup={() => handlePopup('open')} />
      </div>

      {isPopupOpen && (
        <CreateProducts
          onClose={() => handlePopup('close')}
          onSubmit={handleProductSubmit}
        />
      )}
    </div>
  );
};

export default HeaderWrapper;
