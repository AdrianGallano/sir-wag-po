import React, { useState, useEffect } from 'react';
import { Product } from '@/models/product';
import PopupBase from './Popup-Base';
import dataFetch from '@/services/data-service';
import { useAuth } from '@/context/authContext';
import { Category } from '@/models/category';
import { Supplier } from '@/models/supplier';

interface CreateProductsProps {
  product?: Product;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  initialImageId?: string; 
  // categories: Category[];
  // suppliers: Supplier[];
}

const CreateProducts: React.FC<CreateProductsProps> = ({ product, onClose, onSubmit, initialImageId }) => {
  const [imageId, setImageId] = useState<number | undefined>(initialImageId ? parseInt(initialImageId) : undefined);
  const [categories, setCategories] = useState<{ id: number; label: string }[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: number; label: string }[]>([]);

  const { token } = useAuth(); // Get the token from the auth context

  const fields = [
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Price', key: 'price', type: 'number' },
    { label: 'Cost Price', key: 'cost_price', type: 'number' },
    { label: 'Category', key: 'category', type: 'select' }, 
    { label: 'Supplier', key: 'supplier', type: 'select' }, 
    { label: 'User', key: 'user' },
  ];

  // Function to handle form submission
  const handleSubmit = (data: any) => {
    const updatedProduct = {
        ...product,
        ...data,
        category: Number(data.category), 
        supplier: Number(data.supplier), 
    };

    // Log the updated product for debugging 
    console.log('Updated Product:', updatedProduct);
    
    onSubmit(updatedProduct);
};
  

  // Function to fetch suppliers
  const getSuppliers = async () => {
    const endpoint = '/api/suppliers/';

    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await dataFetch(endpoint, 'GET', {}, token);
      console.log('Suppliers fetched:', response);
      const suppliersData = response.map((sup: any) => ({ id: sup.id, label: sup.name }));
      setSuppliers(suppliersData);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  // Function to fetch categories
  const getCategories = async () => {
    const endpoint = '/api/categories/';

    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await dataFetch(endpoint, 'GET', {}, token);
      console.log('Categories fetched:', response);
      const categoriesData = response.map((cat: any) => ({ id: cat.id, label: cat.name }));
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getSuppliers();
    getCategories();
  }, []); 

  return (
    <PopupBase
      title={`Add ${product ? product.name : 'New Product'}`}
      initialData={product || { name: '', description: '', price: '', cost_price: '', category: '', supplier: '', user: '', image: '' }}
      fields={fields}
      onClose={onClose}
      onSubmit={handleSubmit}
      isNeededToOpen={true}
      categories={categories} 
      suppliers={suppliers} 
    />
  );
};

export default CreateProducts;
