import React, { useState, useEffect } from 'react';
import InventoryProductHorizontalCards from './Product-list/inventory-product-horizontalcards';
import InventoryProductVerticalCards from './Product-list/inventory-product-verticalcards';
import HeaderWrapper from '../inventory-header/header-wrapper';
import { products } from '../models/products';
import InventoryPopUp from '../popup/InventoryPopUp';
import { Product } from '../models/products-interface';

interface MainInventoryProps {
  filters: { category?: string; stockStatus?: string };
}

const MainInventory: React.FC<MainInventoryProps> = ({ filters }) => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [popUp, setPopup] = useState<'open' | 'close'>('close');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  //changing layout
  const handleLayoutChange = (selectedLayout: 'horizontal' | 'vertical') => {
    setLayout(selectedLayout);
  };
  //opening and closing of popup
  const handlePopup = (selectedPopup: 'open' | 'close', product: Product | null = null) => {
    setSelectedProduct(product);
    setPopup(selectedPopup);
  };  

  useEffect(() => {
    if (!filters) return;

    const updatedProducts = products.filter(product => {
      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesStockStatus = filters.stockStatus ? product.stock_status === filters.stockStatus : true;
      return matchesCategory && matchesStockStatus;
    });

    setFilteredProducts(updatedProducts);
  }, [filters]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <HeaderWrapper onLayoutChange={handleLayoutChange} />

      {/* Product List */}
      {layout === 'horizontal' ? (
        <InventoryProductHorizontalCards products={filteredProducts} onOpenPopup={handlePopup} />
      ) : (
        <InventoryProductVerticalCards products={filteredProducts} onOpenPopup={handlePopup} />
      )}

      {/* Popup */}
      {popUp === 'open' && selectedProduct && (
        <InventoryPopUp product={selectedProduct} onClose={() => handlePopup('close')} />
      )}
    </div>
  );
};

export default MainInventory;
