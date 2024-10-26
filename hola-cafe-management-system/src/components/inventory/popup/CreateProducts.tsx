import React from 'react';
import { Product } from '../models/products-interface';
import PopupBase from './Popup-Base';

interface CreateProductsProps {
  product?: Product;
  onClose: () => void;
  onSubmit: (data: Product) => void;
}

const CreateProducts: React.FC<CreateProductsProps> = ({ product, onClose, onSubmit }) => {
  const fields = [
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Price', key: 'price', type: 'number' },
    { label: 'Cost Price', key: 'cost_price', type: 'number' },
    { label: 'Category', key: 'category' },
    { label: 'Supplier', key: 'supplier' },
    { label: 'User', key: 'user' },
  ];

  return (
    <PopupBase
      title={`Add ${product ? product.name : 'New Product'}`}
      initialData={product || { name: '', description: '', price: '', cost_price: '', category: '', supplier: '', user: '' }}
      fields={fields}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default CreateProducts;
