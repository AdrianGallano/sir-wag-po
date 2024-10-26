import React from 'react';
import { Ellipsis } from 'lucide-react';
import { Product } from '../models/products-interface';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { on } from 'events';


interface HeaderCrudProps {
  onOpenPopup: (popup: 'open' | 'close', product: Product) => void;
  onOpenCategoryPopup: (popup: 'open' | 'close') => void;
  onOpenSupplierPopup: (popup: 'open' | 'close') => void;
}

const HeaderCrud = ({ onOpenPopup, onOpenCategoryPopup, onOpenSupplierPopup }: HeaderCrudProps) => {
  const handleAddProduct = () => {
    onOpenPopup('open', {} as Product); 
  };
  
  const handleAddCategory = () => {
    onOpenCategoryPopup('open');
  };

  const handleAddSupplier = () => {
    onOpenSupplierPopup('open');
  };

  return (
    <div className='ml-8 flex flex-row space-x-2'>
      <div className='flex flex-row w-full rounded-lg bg-background md:w-[20px] lg:w-[200px] space-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis className='h-full w-full text-muted-foreground'/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleAddCategory}>Add Category</DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddSupplier}>Add Supplier</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={handleAddProduct} className='border hover:bg-gray-900 hover:border-gray-100 rounded-lg bg-gray-800 text-white p-2 h-[40px] w-full text-sm text-muted-foreground'>
          Add Products
        </button>
      </div>
    </div>
  );
}

export default HeaderCrud;
