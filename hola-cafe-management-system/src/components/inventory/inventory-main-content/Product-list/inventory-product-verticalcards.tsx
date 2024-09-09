import { Ellipsis } from 'lucide-react';
import { Product } from '../../models/products-interface';

interface InventoryProductVerticalCardsProps {
  products: Product[];
  onOpenPopup: (popup: 'open' | 'close', product: Product) => void;
}

const InventoryProductVerticalCards = ({ products = [], onOpenPopup }: InventoryProductVerticalCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-4 w-[96.4%]">
      {products.map((product, index) => (
        <div
          key={index}
          onClick={() => {onOpenPopup('open', product)}}
          className="p-4 bg-white border rounded-lg shadow-lg flex flex-col"
        >
          <img
            src={product.product_image}
            alt={product.product_name}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="mt-2 text-black font-bold">{product.product_name}</div>
          <div className="flex flex-col text-sm text-black mt-2">
            {product.variants && <div>{product.variants}</div>}
            <div>{product.category}</div>
            <div>{product.product_type}</div>
            <div className={`text-sm ${product.stock_status === 'low' || product.stock_status === 'out of stock' ? 'text-red-500' : 'text-green-500'}`}>
              {product.stock}
            </div>
            <div className="flex mt-2">
              <div className="flex-1 text-xs">RETAIL PRICE</div>
              <div>{product.retail_price}</div>
            </div>
            <div className="flex mt-1">
              <div className="flex-1 text-xs">WHOLESALE PRICE</div>
              <div>{product.wholesale_price}</div>
            </div>
          </div>
          <button className=" mt-auto border hover:bg-gray-100 hover:border-white rounded-lg bg-background p-2 h-[40px] w-[40px]">
            <Ellipsis className="h-full w-full text-muted-foreground" />
          </button>
        </div>

      ))}
    </div>
  );
};

export default InventoryProductVerticalCards;
