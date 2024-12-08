import React from 'react';
import PosCards from './cards';
import { Package } from 'lucide-react';

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  image: {
    image_url: string;
    id: number;
  };
}

interface PosMenusProps {
  menus: Menu[];
  addToCart: (productId: number, quantity: number) => void;
}

const PosMenus: React.FC<PosMenusProps> = ({ menus, addToCart }) => {
  // Group menus by category
  const categorizedMenus = menus.reduce((acc: Record<string, Menu[]>, menu) => {
    const categoryName = menu.category.name || "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(menu);
    return acc;
  }, {});

  return (
    <div className="mb-6 mr-[26%]">
      <h2 className="text-2xl text-gray-800 font-semibold mb-4">Menus</h2>
      {menus.length === 0 ? (
        // Placeholder for "No Product Found"
        <div className="flex justify-center w-full text-center">
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <Package className="text-gray-400 text-6xl" />
                <h2 className="mt-4 text-xl font-semibold text-gray-700">
                  No Product Found
                </h2>
                <p className="mt-2 text-center text-gray-500">
                  It looks like we couldn’t find any products here. Start by
                  adding some new products to see them listed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Display categorized menus
        Object.keys(categorizedMenus).map((categoryName) => (
          <div key={categoryName} className="mb-8">
            <h3 className="text-xl text-gray-800 font-bold mb-4">{categoryName}</h3>
            <div className="grid grid-cols-4 gap-2">
              {categorizedMenus[categoryName].map((menu) => (
                <PosCards key={menu.id} product={menu} addToCart={addToCart} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PosMenus;
