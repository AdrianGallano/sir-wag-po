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

  // Allowing the layout to be changed based on tab value
  const handleLayoutChange = (selectedLayout: string) => {
    // Casting string to "horizontal" | "vertical"
    if (selectedLayout === 'horizontal' || selectedLayout === 'vertical') {
      setLayout(selectedLayout);
    }
  };

  // Opening and closing of popup
  const handlePopup = (selectedPopup: 'open' | 'close', product: Product | null = null) => {
    setSelectedProduct(product);
    setPopup(selectedPopup);
  };

  // Filtering products based on category and stock status
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
      {/* Header with Tabs */}
      <HeaderWrapper onLayoutChange={handleLayoutChange} />

      {/* Product List based on layout */}
      {layout === 'horizontal' ? (
        <InventoryProductHorizontalCards products={filteredProducts} onOpenPopup={handlePopup} />
      ) : (
        <InventoryProductVerticalCards products={filteredProducts} onOpenPopup={handlePopup} />
      )}

      {/* Popup for product details */}
      {popUp === 'open' && selectedProduct && (
        <InventoryPopUp product={selectedProduct} onClose={() => handlePopup('close')} />
      )}
    </div>
  );
};

export default MainInventory;
