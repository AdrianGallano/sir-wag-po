import React, { useState } from 'react';
import PlaceHolder from '../../assets/images/hola_logo.jpg';

interface PosCardsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: any;
  };
  addToCart: (productId: string, quantity: number) => void;
}

const PosCards: React.FC<PosCardsProps> = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
    console.log('add') // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    console.log('add to cart') // Add product to cart
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={product.image || PlaceHolder} // Use placeholder if no image
        alt={product.name}
        className="mb-4 rounded-md w-full h-56"
      />
      <div className="flex justify-between">
        <div className="text-sm mb-2 text-gray-500">#{product.id}</div>
      </div>
      <div className="text-2xl font-semibold mb-1 underline">{product.name}</div>
      <div className="text-sm mb-2">{product.description}</div>
      <div className="flex items-center justify-between pl-20 pr-20 mb-4">
        <button
          className="px-2 py-1 text-lg font-bold bg-transparent rounded"
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
          <span className="text-lg font-semibold">{quantity}</span>
        </div>
        <button
          className="px-2 py-1 text-lg font-bold bg-transparent rounded"
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>
      <button
        className="w-full px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default PosCards;
