import React, { useState } from 'react';
import PlaceHolder from '../../assets/images/hola_logo.jpg';
import { Button } from '../ui/button';
import { Stock } from '@/models/stock';

interface StockPosCardsProps {
  stocks: Stock;
  addToCart: (stocksId: number, quantity: number) => void;
}

const PosCards: React.FC<StockPosCardsProps> = ({ stocks, addToCart }) => {
  const [quantity, setQuantity] = useState(0); // Initialize selected quantity

  const getStockStatus = (quantity: number): string => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= 20) return 'Low Stock';
    return 'In Stock';
  };

  const handleIncrease = () => {
    if (quantity < Number(stocks.quantity)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(stocks.id, quantity);
    setQuantity(0); // Reset quantity after adding to cart
  };

  return (
    <div className="flex flex-col border p-4 rounded-lg shadow-lg h-full bg-white hover:shadow-xl transition-all">
      <img
        src={stocks?.image?.image_url.replace(/\\/g, '/') || PlaceHolder} // Ensure correct URL format and fallback to placeholder
        alt={stocks.name}
        className="mb-4 rounded-md w-full h-56 object-cover"
        onError={(e) => (e.currentTarget.src = PlaceHolder)} // Fallback to placeholder on image error
      />
      <div className="text-sm mb-2 text-gray-500">#{stocks.id}</div>

      <div className="w-full flex items-center gap-1.5 mt-3 justify-between">
        <div className="text-lg font-medium mb-1">{stocks.name}</div>
        <div className="flex items-center gap-1.5">
          <span
            className={`block h-5 w-24 rounded-full ${
              getStockStatus(Number(stocks.quantity)) === 'Out of Stock'
                ? 'bg-red-500'
                : getStockStatus(Number(stocks.quantity)) === 'Low Stock'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
          ></span>
          <div className="flex flex-col">
            <span
              className={`text-sm font-medium ${
                getStockStatus(Number(stocks.quantity)) === 'Out of Stock'
                  ? 'text-red-500'
                  : getStockStatus(Number(stocks.quantity)) === 'Low Stock'
                  ? 'text-yellow-500'
                  : 'text-green-500'
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
        <button
          className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
          onClick={handleDecrease}
          disabled={quantity <= 0}
        >
          -
        </button>
        <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
          <input
            type="text"
            className="w-16 text-center text-lg font-semibold border-none outline-none"
            value={quantity}
            readOnly
          />
        </div>
        {/* Increase quantity button */}
        <button
          className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
          onClick={handleIncrease}
          disabled={quantity >= Number(stocks.quantity)}
        >
          +
        </button>
      </div>

      <div className="flex-grow"></div>

      <Button
        className="w-full rounded-full text-white h-10 hover:bg-custom-charcoalOlive bg-custom-char"
        onClick={handleAddToCart}
        disabled={quantity === 0} // Disable if no quantity is selected
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default PosCards;
