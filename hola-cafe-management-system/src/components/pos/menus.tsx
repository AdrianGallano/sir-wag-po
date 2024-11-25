import React from 'react';
import PosCards from './cards';

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  category: any;
  image: string;
}

interface PosMenusProps {
  menus: Menu[];
  addToCart: (productId: number, quantity: number) => void;
}

const PosMenus: React.FC<PosMenusProps> = ({ menus, addToCart }) => {
  return (
    <>
      <div className="mb-6 mr-[26%]"> {/* Added margin-left to push content right */}
        <h2 className="text-2xl font-semibold mb-4">Menus</h2>
        <div className="grid grid-cols-4 gap-2">
          {menus.map((menu) => (
            <PosCards key={menu.id} product={menu} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PosMenus;
