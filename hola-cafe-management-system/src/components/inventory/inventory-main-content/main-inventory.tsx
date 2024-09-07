import React, { useState, useEffect } from 'react';
import InventoryProductHorizontalCards from './Product-list/inventory-product-horizontalcards';
import InventoryProductVerticalCards from './Product-list/inventory-product-verticalcards';
import HeaderWrapper from '../inventory-header/header-wrapper';
import { products } from '../models/products';

interface MainInventoryProps {
  filters: { category?: string; stockStatus?: string };
}

const MainInventory: React.FC<MainInventoryProps> = ({ filters }) => {
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleLayoutChange = (selectedLayout: 'horizontal' | 'vertical') => {
    setLayout(selectedLayout);
  };

  useEffect(() => {
    if (!filters) return; // Handle case when filters might be undefined

    const updatedProducts = products.filter(product => {
      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesStockStatus = filters.stockStatus ? product.stock_status === filters.stockStatus : true;
      return matchesCategory && matchesStockStatus;
    });

    setFilteredProducts(updatedProducts);
    console.log("Filtered products:", updatedProducts); // Debugging
  }, [filters]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <HeaderWrapper onLayoutChange={handleLayoutChange} />
      {/* Product List */}
      {layout === 'horizontal' ? (
        <InventoryProductHorizontalCards products={filteredProducts} />
      ) : (
        <InventoryProductVerticalCards products={filteredProducts} />
      )}
    </div>
  )
}

export default MainInventory;
