import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/models/product";
import dataFetch from "@/services/data-service";
import { Supplier } from "@/models/supplier";
import { Category } from "@/models/category";
import { useAuth } from "@/context/authContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageManager from "../inventory/popup/ImageManager";

interface EditProductsProps {
  product: Product;
  onClose: () => void;
  onSubmit: (updatedProduct: Product) => void;
}

const EditProducts = ({ product, onClose, onSubmit }: EditProductsProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
  const [categories, setCategories] = useState<{ id: number; label: string }[]>([]);
  const [suppliers, setSuppliers] = useState<{ id: number; label: string }[]>([]);
  const [isImageManagerOpen, setImageManagerOpen] = useState(false);
  const { token, id } = useAuth();

  useEffect(() => {
    setUpdatedProduct(product);
    fetchCategories();
    fetchSuppliers();
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    const selectedId = parseInt(value);
    const selectedLabel =
      name === "supplier"
        ? suppliers.find((sup) => sup.id === selectedId)?.label
        : categories.find((cat) => cat.id === selectedId)?.label;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: { id: selectedId, name: selectedLabel },
    }));
  };

  const handleSubmit = () => {
    const productToSubmit = {
      ...updatedProduct,
      user: id,
      supplier: updatedProduct.supplier?.id,
      category: updatedProduct.category?.id,
      image: updatedProduct.image_id,
    };
    onSubmit(productToSubmit);
    onClose();
  };

  const fetchCategories = async () => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const categories = (await dataFetch("api/categories/", "GET", {}, token)) as Category[];
      setCategories(categories.map((category) => ({ id: category.id, label: category.name })));
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchSuppliers = async () => {
    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const suppliers = (await dataFetch("api/suppliers/", "GET", {}, token)) as Supplier[];
      setSuppliers(suppliers.map((supplier) => ({ id: supplier.id, label: supplier.name })));
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
    }
  };

  const handleImageSelect = (imageId: string) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      image_id: imageId,
    }));
    setImageManagerOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h3 className="text-2xl font-semibold mb-6">Edit Product</h3>
        <div className="grid gap-6">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={updatedProduct.name || ""}
              onChange={handleInputChange}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={updatedProduct.description || ""}
              onChange={handleInputChange}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              value={updatedProduct.price || ""}
              onChange={handleInputChange}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              value={updatedProduct.quantity || ""}
              onChange={handleInputChange}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="cost_price">Cost Price</Label>
            <Input
              id="cost_price"
              name="cost_price"
              value={updatedProduct.cost_price || ""}
              onChange={handleInputChange}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="supplier">Supplier</Label>
            <Select
              value={updatedProduct.supplier?.id?.toString() || ""}
              onValueChange={(value) => handleSelectChange("supplier", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {updatedProduct.supplier?.name || "Select Supplier"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Suppliers</SelectLabel>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="category">Category</Label>
            <Select
              value={updatedProduct.category?.id?.toString() || ""}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {updatedProduct.category?.name || "Select Category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="image_url">Product Image</Label>
          <Button
            onClick={() => setImageManagerOpen(true)}
            className="col-span-2"
          >
            Manage Images
          </Button>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose} className="px-6 py-2 rounded-md">
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit} className="px-6 py-2 rounded-md">
            Save Changes
          </Button>
        </div>
      </div>
      <ImageManager
        isOpen={isImageManagerOpen}
        onClose={() => setImageManagerOpen(false)}
        onSelectImage={handleImageSelect}
      />
    </div>
  );
};

export default EditProducts;
