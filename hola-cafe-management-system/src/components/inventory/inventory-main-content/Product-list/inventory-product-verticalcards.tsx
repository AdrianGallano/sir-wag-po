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

const InventoryProductVerticalCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4 ml-4 w-[96.4%]">
      {products.map((product, index) => (
        <div key={index} className="p-4 bg-white border rounded-lg shadow-lg w-full h-full flex flex-col">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={product.product_image}
              alt={product.product_name}
              className="w-full h-4w-full object-cover rounded-md"
            />
          </div>

          {/* Content Section */}
          <div className="mt-4 flex flex-col justify-between flex-1">
            <div className="text-black font-bold text-center">{product.product_name}</div>
            <div className="mt-2 text-sm text-black space-y-2 text-center">
              {product.variants && <div>{product.variants}</div>}
              <div>{product.category}</div>
              <div>{product.product_type}</div>
              <div className={`text-sm ${product.stock_status === 'low' ? 'text-red-500' : 'text-green-500'}`}>
                {product.stock}
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-2 flex flex-col items-center">
              <div className="text-xs">RETAIL PRICE</div>
              <div>{product.retail_price}</div>
              <div className="text-xs mt-2">WHOLESALE PRICE</div>
              <div>{product.wholesale_price}</div>
            </div>

            {/* Button Section */}
            <div className="mt-4 flex justify-center">
              <button className='border hover:bg-gray-100 hover:border-white rounded-lg bg-background p-2 h-[40px] w-[40px]'>
                <Ellipsis className="h-full w-full text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InventoryProductVerticalCards