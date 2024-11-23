import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface PosTransactionProps {
  cartProducts: CartProduct[];
  openTransactionPopup: () => void;
}

const PosTransaction: React.FC<PosTransactionProps> = ({
  cartProducts,
  openTransactionPopup,
}) => {
  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="w-1/4 border-l pt-12 pb-24 pl-4 pr-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold underline">Transaction</h2>
      </div>

      <div className="border rounded-lg p-4 h-full relative bg-white">
        {/* Cart Products */}
        <div className="mb-4 overflow-y-auto max-h-[60vh]">
          {cartProducts.length === 0 ? (
            <p className="text-gray-500 text-center">No items in the cart</p>
          ) : (
            <ul className="space-y-2">
              {cartProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center bg-white p-2 rounded shadow-sm border"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name || 'Product Name'}</p>
                    <p className="text-sm text-gray-500">
                      {product.quantity} x ${product.price || 1000}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">
                      ${(product.price * product.quantity || 100000)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Total Quantity:</p>
            <p className="font-semibold text-gray-800">
              {cartProducts.reduce((acc, product) => acc + product.quantity, 0)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Total Price:</p>
            <p className="font-bold text-xl text-gray-900">
              ${totalPrice || 1000}
            </p>
          </div>
        </div>

        {/* Open Transaction Popup Button */}
        <button
          onClick={openTransactionPopup}
          className="absolute bottom-4 left-4 right-4 bg-yellow-400 text-black py-3 rounded-md hover:bg-yellow-600 transition"
        >
          Proceed to Transaction
        </button>
      </div>
    </div>
  );
};

export default PosTransaction;
