import { Ellipsis, EyeIcon } from 'lucide-react'; 
import { Product } from '@/models/product';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; 
import ProductPreview from '@/components/hcims/productpreview';
import placeholder from '@/assets/images/hola_logo.jpg';


interface InventoryProductVerticalCardsProps {
  products: Product[];
}

const InventoryProductVerticalCards = ({ products }: InventoryProductVerticalCardsProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedItem) {// Ensure selectedItem is not null
      console.log("Product selected:", selectedItem);
    }
  }, [selectedItem]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-4 w-[96.4%]">
      {products.map((product, index) => (
        <div
          key={index}
          className="p-4 bg-white border rounded-lg shadow-lg flex flex-col"
        >
          <img
             src={placeholder}
             alt={product.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="mt-2 text-black font-bold">{product.name}</div>
          <div className="flex flex-col text-sm text-black mt-2">
            <div className="flex mt-2">
              <div className="flex-1 text-xs">PRICE</div>
              <div>{product.price}</div>
            </div>
            <div className="flex mt-1">
              <div className="flex-1 text-xs">COST PRICE</div>
              <div>{product.cost_price}</div>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                onClick={() => setSelectedItem(product)}
                className="border border-custom-sunnyGold hover:bg-custom-sunnyGold bg-white hover:text-white py-2 px-3"
              >
                <EyeIcon className="w-5 text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[35%]">
              {selectedItem && <ProductPreview product={selectedItem} />}
            </SheetContent>
          </Sheet>
        </div>
      ))}
    </div>
  );
};

export default InventoryProductVerticalCards;
