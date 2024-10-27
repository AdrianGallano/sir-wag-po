import React from 'react';
import { Grid2X2, List } from 'lucide-react';
import SearchInput from '@/components/search';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderCrud from './header-crud';
import CreateProducts from '../popup/CreateProducts';
import dataFetch from '@/services/data-service';
import { Product } from '../models/products-interface';
import CreateCategory from '../popup/CreateCategories';
import CreateSuppliers from '../popup/CreateSuppliers';
import { useAuth } from '@/context/authContext';

interface HeaderWrapperProps {
  onLayoutChange: (layout: string) => void;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ onLayoutChange }) => {
  const [isProductPopupOpen, setIsProductPopupOpen] = React.useState<boolean>(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = React.useState<boolean>(false);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = React.useState<boolean>(false);

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

  // Function to handle Create product
  const handleProductSubmit = async (productData: Product) => {
    try {
        const endpoint = '/api/products/';

        if(!token) {
          console.error('Token not found in response');
          throw new Error('Token not found in response');
        }

        const response = await dataFetch(endpoint, 'POST', productData, token); // Include token in the request
        console.log('Product saved:', response);
        setIsProductPopupOpen(false); 
    } catch (error) { // Error handling
        console.error("Error saving product:", error);
        console.log('Product not saved:', productData);
    }
};
  // Function to handle Create category
  const handleCategorySubmit = async (categoryData: any) => {
    try {
      const endpoint = '/api/categories/'

      if(!token) {
        console.error('Token not found in response');
        throw new Error('Token not found in response');
      }

      const response = await dataFetch(endpoint, 'POST', categoryData, token); // Include token in the request
      console.log('Category saved:', response);
      setIsCategoryPopupOpen(false);
    } catch (error) { // Error handling
      console.error("Error saving category:", error);
      console.log('Category not saved:', categoryData);
    }
  }
  // Function to handle Create supplier
  const handleSupplierSubmit = async (supplierData: any) => {
    try {
      const endpoint = '/api/suppliers/'

      if(!token) {
        console.error('Token not found in response');
        throw new Error('Token not found in response');
      }

      const response = await dataFetch(endpoint, 'POST', supplierData, token); // Include token in the request
      console.log('Supplier saved:', response);
      setIsSupplierPopupOpen(false);
    } catch (error) { // Error handling
      console.error("Error saving supplier:", error);
      console.log('Supplier not saved:', supplierData);
    }
  }

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

    </div>
  );
};

export default HeaderWrapper;
