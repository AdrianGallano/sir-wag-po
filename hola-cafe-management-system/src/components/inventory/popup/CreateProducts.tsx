import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '../models/products-interface';

interface CreateProductsProps {
  product?: Product;
  onClose: () => void;
  onSubmit: (data: any) => void; // Callback for submitting the product data
}

const CreateProducts: React.FC<CreateProductsProps> = ({ product, onClose, onSubmit }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const [costPrice, setCostPrice] = useState(product?.cost_price || '');
  const [category, setCategory] = useState(product?.category || '');
  const [supplier, setSupplier] = useState(product?.supplier || '');
  const [user, setUser] = useState(product?.user || '');

  const handleSubmit = () => {
    const newProduct = {
      name,
      description,
      price,
      cost_price: costPrice,
      category,
      supplier,
      user,
    };

    onSubmit(newProduct); // Call the submit handler passed from the parent
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product : {product ? product.name : 'New Product'}</DialogTitle>
          <DialogDescription>
            Fill in the details of the product.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost_price" className="text-right">Cost Price</Label>
            <Input id="cost_price" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supplier" className="text-right">Supplier</Label>
            <Input id="supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">User</Label>
            <Input id="user" value={user} onChange={(e) => setUser(e.target.value)} className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} type="button">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProducts;
