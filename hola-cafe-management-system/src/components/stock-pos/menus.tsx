import React from 'react';
import PosCards from './cards'; 
import { Package } from 'lucide-react'; 
import { Stock } from '@/models/stock'; 

interface StockPosstockProps {
  stocks: Stock[]; // Array of stocks passed as a prop
  addToCart: (productId: number, quantity: number) => void; // Function to add items to the cart
}

const Posstock: React.FC<StockPosstockProps> = ({ stocks, addToCart }) => {
  return (
    <div className="mb-6 mr-[26%]">
      <h2 className="text-2xl text-gray-800 font-semibold mb-4">Stock</h2>
      {stocks.length === 0 ? (
        // Placeholder when no stocks are available
        <div className="flex justify-center w-full text-center">
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <Package className="text-gray-400 text-6xl" />
                <h2 className="mt-4 text-xl font-semibold text-gray-700">
                  No Stocks Found
                </h2>
                <p className="mt-2 text-center text-gray-500">
                  It looks like we couldn’t find any stocks here. Start by adding some new stocks to see them listed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Display stocks in a grid layout
        <div className="grid grid-cols-3 gap-4">
          {stocks.map((stock) => (
            <PosCards key={stock.id} stocks={stock} addToCart={addToCart} /> 
          ))}
        </div>
      )}
    </div>
  );
};

export default Posstock;
