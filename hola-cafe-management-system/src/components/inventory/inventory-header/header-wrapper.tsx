import React from 'react';
import { Grid2X2, List } from 'lucide-react';
import SearchInput from '@/components/search';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderCrud from './header-crud';
import CreateProducts from '../popup/CreateProducts';
import dataFetch from '@/services/data-service';
import CreateCategory from '../popup/CreateCategories';
import { Product } from '@/models/product';
import CreateSuppliers from '../popup/CreateSuppliers';
import { useAuth } from '@/context/authContext';
import MessagePopup from '@/components/messagepopup';

interface HeaderWrapperProps {
  onLayoutChange: (layout: string) => void;
  onProductCreated: () => void;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ onLayoutChange, onProductCreated }) => {
  const [isProductPopupOpen, setIsProductPopupOpen] = React.useState<boolean>(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = React.useState<boolean>(false);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = React.useState<boolean>(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const handlePopup = (popupType: "product" | "category" | "supplier", action: "open" | "close") => {
    if (popupType === "product") {
      setIsProductPopupOpen(action === "open");
    } else if (popupType === "category") {
      setIsCategoryPopupOpen(action === "open");
    } else if (popupType === "supplier") {
      setIsSupplierPopupOpen(action === "open");
    }
  };
  const {token} = useAuth(); // Get the token from the useAuth function

  // Function to handle product submit
  const handleProductSubmit = async (productData: Product) => {
    try {
      const endpoint = '/api/products/';
      if (!token) throw new Error('Token not found');
  
      const response = await dataFetch(endpoint, 'POST', productData, token);
      console.log('Product saved:', response);

      // Call the onProductCreated to refetch products
      onProductCreated(); // Refetch products after creating a new one
  
      setIsProductPopupOpen(false);
      setMessage('Product saved successfully');
      setIsMessagePopupOpen(true); // Open the message popup
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  // Function to handle category submit
  const handleCategorySubmit = async (categoryData: any) => {
    try {
      const endpoint = '/api/categories/';
      if (!token) throw new Error('Token not found');
  
      const response = await dataFetch(endpoint, 'POST', categoryData, token);
      console.log('Category saved:', response);
  
      setIsCategoryPopupOpen(false);
      setMessage('Category saved successfully');
      setIsMessagePopupOpen(true); // Open the message popup
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };
  // Function to handle supplier submit 
  const handleSupplierSubmit = async (supplierData: any) => {
    try {
      const endpoint = '/api/suppliers/';
      if (!token) throw new Error('Token not found');
  
      const response = await dataFetch(endpoint, 'POST', supplierData, token);
      console.log('Supplier saved:', response);
  
      setIsSupplierPopupOpen(false);
      setMessage('Supplier saved successfully');
      setIsMessagePopupOpen(true); // Open the message popup
    } catch (error) {
      console.error("Error saving supplier:", error);
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
        <HeaderCrud onOpenSupplierPopup={()=>{handlePopup('supplier','open')}} onOpenCategoryPopup={()=>{handlePopup('category','open')}} onOpenPopup={() => handlePopup('product','open')} />
      </div>

      {isProductPopupOpen && (
        <CreateProducts
          onClose={() => handlePopup('product', 'close')}
          onSubmit={handleProductSubmit}
        />
      )}

      {isCategoryPopupOpen && (
        <CreateCategory
          onClose={() => handlePopup('category', 'close')}
          onSubmit={handleCategorySubmit}
        />
      )}

      {isSupplierPopupOpen && (
        <CreateSuppliers
          onClose={() => handlePopup('supplier', 'close')}
          onSubmit={handleSupplierSubmit}
        />
      )}

      {isMessagePopupOpen && (
        <MessagePopup
          message={message}
          onClose={() => setIsMessagePopupOpen(false)}
          onOpen={isMessagePopupOpen}
        />
      )}

    </div>
  );
};

export default HeaderWrapper;
