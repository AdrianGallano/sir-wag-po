import React, { useState } from 'react';
import PlaceHolder from '../../assets/images/hola_logo.jpg';
import { Button } from '../ui/button';

interface PosCardsProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: {
      image_url: string;
      id: number;
    };
    category: any;
  };
  addToCart: (productId: number, quantity: number) => void;
}

const PosCards: React.FC<PosCardsProps> = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1); // Start with 1 as default quantity

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    console.log('Product added to cart:', product.name);
  };

  return (
    <div className="flex flex-col border p-4 rounded-lg shadow-lg h-full bg-white hover:shadow-xl transition-all">
      <img
        src={product?.image?.image_url.replace(/\\/g, '/') || PlaceHolder} // Ensure correct URL format and fallback to placeholder
        alt={product.name}
        className="mb-4 rounded-md w-full h-56 object-cover"
        onError={(e) => (e.currentTarget.src = PlaceHolder)} // Fallback to placeholder on image error
      />
      <div className="text-sm mb-2 text-gray-500">#{product.id}</div>

      <div className="text-lg font-medium mb-1">{product.name}</div>
      <div className="text-xl font-bold text-black mb-3">{`₱ ${product.price}`}</div>

      <div className="flex items-center justify-between mb-4">
        <button
          className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
          <input
            type="text" // Changed to "text" for more control over input behavior
            className="w-16 text-center text-lg font-semibold border-none outline-none"
            value={quantity}
            onChange={(e) => {
              const inputValue = e.target.value;
              // Allow clearing or editing the input
              if (inputValue === "" || /^[0-9]+$/.test(inputValue)) {
                handleQuantityChange(parseInt(inputValue || '0', 10) - quantity);
              }
            }}
            onBlur={(e) => {
              // Reset to 1 if the input is empty or invalid on blur
              if (e.target.value === "" || Number(e.target.value) <= 0) {
                handleQuantityChange(1 - quantity);
              }
            }}
          />
        </div>
        <button
          className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>


      <div className="flex-grow"></div>

      <Button
        className="w-full rounded-full text-white h-10 hover:bg-custom-charcoalOlive bg-custom-char"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default PosCards;
