import React from 'react';
import { Product } from '@/models/product';

interface DeleteProductsProps {
  product: Product;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteProducts: React.FC<DeleteProductsProps> = ({ product, onClose, onSubmit }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">
        Are you sure you want to delete "{product.name}"?
      </h2>
      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="btn-cancel">No</button>
        <button onClick={onSubmit} className="btn-delete">Yes</button>
      </div>
    </div>
  );
};

export default DeleteProducts;
