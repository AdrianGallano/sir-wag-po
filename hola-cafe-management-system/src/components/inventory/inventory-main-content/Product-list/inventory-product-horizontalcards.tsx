import { Ellipsis } from 'lucide-react';
import { Product } from '../../models/products-interface';

interface InventoryProductHorizontalCardsProps {
  products: Product[];
  onOpenPopup: (popup: 'open' | 'close', product: Product) => void;
}

export function InventoryProductHorizontalCards({ products = [], onOpenPopup }: InventoryProductHorizontalCardsProps) {
  return (
    <div className="space-y-1 ml-4 w-[96.4%]">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex p-4 bg-white border rounded-lg shadow-lg cursor-pointer"
          onClick={() => onOpenPopup('open', product)}  // Trigger popup with product data
        >
          {/* Left Side */}
          <div className="flex-1 flex items-start">
            <img
              src={product.product_image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="ml-4 flex flex-col justify-between">
              <div className="text-black font-bold">{product.name}</div>
              <div className="flex text-sm text-black space-x-4">
                <div className="flex items-center">
                  <div
                  className='flex justify-between space-x-10'
                    // className={`text-sm ${
                    //   product.stock_status === 'low' || product.stock_status === 'out of stock'
                    //     ? 'text-red-500'
                    //     : 'text-green-500'
                    // }`}
                  >
                    {product.description}
                    {product.quantity}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-end space-x-4">
            <div className="flex flex-col text-black space-y-2">
              <div className="flex items-center">
                <div className="text-xs">PRICE</div>
                <div className="ml-2">{product.price}</div>
              </div>
              <div className="flex items-center">
                <div className="text-xs">COST PRICE</div>
                <div className="ml-2">{product.cost_price}</div>
              </div>
            </div>
            <button className="border hover:bg-gray-100 hover:border-white rounded-lg bg-background p-2 h-[40px] w-[40px]">
              <Ellipsis className="h-full w-full text-muted-foreground" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryProductHorizontalCards;
