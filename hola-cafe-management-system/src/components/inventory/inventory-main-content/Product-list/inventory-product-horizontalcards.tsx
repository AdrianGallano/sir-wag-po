import React from 'react';
import { Ellipsis } from 'lucide-react'; 
import pumaImage from '../../product-images/puma.jpg'

const products = [
  {
    product_image: pumaImage,
    product_name: "Adidas NEO Light Green 36",
    variants: "",
    category: "Man Shoes",
    product_type: "Stacked Product",
    stock: "12 in stock",
    stock_status: "low",
    retail_price: "$280.00",
    wholesale_price: "$300.00",
  },
  {
    product_image:pumaImage,
    product_name: "Adidas NEO Light Green 36",
    variants: "",
    category: "Man Shoes",
    product_type: "Stacked Product",
    stock: "12 in stock",
    stock_status: "low",
    retail_price: "$280.00",
    wholesale_price: "$300.00",
  },
  {
    product_image:pumaImage,
    product_name: "Adidas NEO Light Green 36",
    variants: "",
    category: "Man Shoes",
    product_type: "Stacked Product",
    stock: "12 in stock",
    stock_status: "low",
    retail_price: "$280.00",
    wholesale_price: "$300.00",
  },
  {
    product_image:pumaImage,
    product_name: "Adidas NEO Light Green 36",
    variants: "",
    category: "Man Shoes",
    product_type: "Stacked Product",
    stock: "12 in stock",
    stock_status: "low",
    retail_price: "$280.00",
    wholesale_price: "$300.00",
  },
  {
    product_image:pumaImage,
    product_name: "Adidas NEO Light Green 36",
    variants: "",
    category: "Man Shoes",
    product_type: "Stacked Product",
    stock: "12 in stock",
    stock_status: "low",
    retail_price: "$280.00",
    wholesale_price: "$300.00",
  },
];

export function InventoryProductHorizontalCards() {
  return (
    <div className="space-y-4 ml-4 w-[96.4%]">
      {products.map((product, index) => (
        <div key={index} className="flex p-4 bg-white border rounded-lg shadow-lg">
          {/* Left Side */}
          <div className="flex-1 flex items-start">
            <img
              src={product.product_image}
              alt={product.product_name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="ml-4 flex flex-col justify-between">
              <div className="text-black font-bold">{product.product_name}</div>
              <div className="flex text-sm text-black space-x-4">
                {product.variants && <div>{product.variants}</div>}
                <div>{product.category}</div>
                <div>{product.product_type}</div>
                <div className="flex items-center">
                  <div className={`text-sm ${product.stock_status === 'low' ? 'text-red-500' : 'text-green-500'}`}>
                    {product.stock}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-end space-x-4">
            <div className="flex flex-col text-black space-y-2">
              <div className="flex items-center">
                <div className='text-xs'>RETAIL PRICE</div>
                <div className="ml-2">{product.retail_price}</div>
              </div>
              <div className="flex items-center">
                <div className='text-xs'>WHOLESALE PRICE</div>
                <div className="ml-2">{product.wholesale_price}</div>
              </div>
            </div>
            <button className='border hover:bg-gray-100 hover:border-white rounded-lg bg-background p-2 h-[40px] w-[40px]'>
              <Ellipsis className="h-full w-full text-muted-foreground" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryProductHorizontalCards;
