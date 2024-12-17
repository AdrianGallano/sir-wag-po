import React from 'react';
import PlaceHolder from '../../assets/images/hola_logo.jpg';
import { Button } from '../ui/button';
import { Stock } from '@/models/stock';

interface StockPosCardsProps {
  stocks: Stock;
  addToCart: (stocksId: number, quantity: number) => void;
}

const PosCards: React.FC<StockPosCardsProps> = ({ stocks, addToCart }) => {

  const getStockStatus = (quantity: number): string => {
    if (quantity === 0) return "Out of Stock";
    if (quantity <= 20) return "Low Stock";
    return "In Stock";
  };
  // Handle releasing stock (decreasing quantity)
  const handleReleaseStock = () => {
    // Only reduce quantity if it's greater than 0
    // if (Number(stocks.quantity > 0)) {
    //   addToCart(stocks.id, 1); // Decrease quantity by 1
    // }
  };

  return (
    <div
      className={`flex flex-col border p-4 rounded-lg shadow-lg h-full bg-white hover:shadow-xl transition-all`}
    >
      <img
        src={stocks?.image?.image_url.replace(/\\/g, '/') || PlaceHolder} // Ensure correct URL format and fallback to placeholder
        alt={stocks.name}
        className="mb-4 rounded-md w-full h-56 object-cover"
        onError={(e) => (e.currentTarget.src = PlaceHolder)} // Fallback to placeholder on image error
      />
      <div className="text-sm mb-2 text-gray-500">#{stocks.id}</div>
      
      {/* Display stock status */}
      <div className="w-full flex items-center gap-1.5 mt-3 justify-between">
        <div className="text-lg font-medium mb-1">{stocks.name}</div>
        <div className='flex items-center gap-1.5'> 
          <span
            className={`block h-5 w-24 rounded-full ${
              getStockStatus(Number(stocks.quantity)) === "Out of Stock"
              ? "bg-red-500"
              : getStockStatus(Number(stocks.quantity)) === "Low Stock"
                ? "bg-yellow-500"
                : "bg-green-500"
              }`}
              ></span>
          <div className="flex flex-col">
            <span
              className={`text-sm font-medium ${
                getStockStatus(Number(stocks.quantity)) === "Out of Stock"
                  ? "text-red-500"
                  : getStockStatus(Number(stocks.quantity)) === "Low Stock"
                  ? "text-yellow-500"
                  : "text-green-500"
                }`}
                >
              {getStockStatus(Number(stocks.quantity))}
            </span>
          </div>
        </div>
      </div>

      <div className="text-xl font-bold text-black mb-3">{`₱ ${stocks.unit_price}`}</div>

      <div className="flex items-center justify-between mb-4">
        {/* Decrease quantity button */}
        <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
          {/* Display the quantity */}
          <input
            type="text"
            className="w-16 text-center text-lg font-semibold border-none outline-none"
            value={stocks.quantity}
            readOnly 
          />
        </div>
        <button
          className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
          onClick={handleReleaseStock}
          disabled={Number(stocks.quantity) <= 0} // Disable if quantity is 0 or below
        >
          -
        </button>
      </div>

      <div className="flex-grow"></div>

      <Button
        className="w-full rounded-full text-white h-10 hover:bg-custom-charcoalOlive bg-custom-char"
        onClick={() => addToCart(stocks.id, 1)} // Release 1 unit of the stock
      >
        Release to Stock
      </Button>
    </div>
  );
};

export default PosCards;
