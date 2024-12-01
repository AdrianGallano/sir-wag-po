import React from 'react';
import PosCards from './cards';

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
    console.log(menu)
    console.log('Category Name:', categoryName);
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(menu);
    return acc;
  }, {});

  return (
    <div className="mb-6 mr-[26%]">
      <h2 className="text-2xl text-gray-800 font-semibold mb-4">Menus</h2>
      {Object.keys(categorizedMenus).map((categoryName) => (
        <div key={categoryName} className="mb-8">
          <h3 className="text-xl text-gray-800 font-bold mb-4">{categoryName}</h3>
          <div className="grid grid-cols-4 gap-2">
            {categorizedMenus[categoryName].map((menu) => (
              <PosCards key={menu.id} product={menu} addToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PosMenus;
