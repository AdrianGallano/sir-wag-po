import React from 'react';
import PosCards from './cards';

interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  category: any;
  image: string;
}

interface PosMenusProps {
  menus: Menu[];
  addToCart: (productId: string, quantity: number) => void;
}

const PosMenus: React.FC<PosMenusProps> = ({ menus, addToCart }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Beverages</h2>
        <div className="grid grid-cols-3 gap-4">
          {menus.map((menu) => (
            <PosCards key={menu.id} product={menu} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PosMenus;
