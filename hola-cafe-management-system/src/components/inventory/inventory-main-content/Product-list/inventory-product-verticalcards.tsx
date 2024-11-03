import { Ellipsis, EyeIcon } from 'lucide-react'; 
import { Product } from '@/models/product';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; 
import ProductPreview from '@/components/hcims/productpreview';
import placeholder from '@/assets/images/hola_logo.jpg';
import { Category } from '@/models/category';
import { Supplier } from '@/models/supplier';


interface InventoryProductVerticalCardsProps {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
}

const InventoryProductVerticalCards = ({ products,   categories,
  suppliers, }: InventoryProductVerticalCardsProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  // monitor product changes
  useEffect(() => {
    if (!selectedItem) {
      console.log("No product selected");
      closeSheet();
    } else {
      console.log("Selected product:", selectedItem);
    }
  }, [selectedItem]);

  // close the sheet
  const closeSheet = () => {
    setSelectedItem(null);
    console.log("Closing preview");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-4 w-[96.4%]">
      {products.map((product, index) => (
        <div
          key={index}
          className="p-4 bg-white border rounded-lg shadow-lg flex flex-col"
        >
          <img
             src={product.image?.image_url || placeholder}
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
          <Sheet open={!!selectedItem} onOpenChange={(open) => { if (!open) closeSheet(); }}>
            <SheetTrigger asChild>
              <Button
                onClick={() => setSelectedItem(product)}
                className="border border-custom-sunnyGold hover:bg-custom-sunnyGold bg-white hover:text-white py-2 px-3"
              >
                <EyeIcon className="w-5 text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[35%]">
              {selectedItem && <ProductPreview
                product={selectedItem}
                categories={categories}
                onClose={closeSheet} 
                suppliers={suppliers} />}
            </SheetContent>
          </Sheet>
        </div>
      ))}
    </div>
  );
};

export default InventoryProductVerticalCards;
