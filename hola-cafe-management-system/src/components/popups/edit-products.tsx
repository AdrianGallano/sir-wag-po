import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import ImageManager from "@/components/hcims/imagemanager";
import placeholder from "@/assets/images/fileupload.png";
import dataFetch from "@/services/data-service";
import { Supplier } from "@/models/supplier";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

interface EditProductsProps {
  isOpen: boolean;
  onClose: () => void;
  product: any; // Replace `any` with the actual Product type
  onChanges: (updatedProduct: Product) => Promise<void>;
}

const EditProducts = ({
  isOpen,
  onClose,
  product,
  onChanges,
}: EditProductsProps) => {
  const { token, id } = useAuth();

  const initialData = {
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    quantity: product.quantity || "",
    cost_price: product.cost_price || "",
    expiration_date: product.expiration_date || null,
    category: product.category?.id || "",
    supplier: product.supplier?.id || "",
    user: id,
    image: product.image || "",
  };

  const fields = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "price", type: "number" },
    { label: "Quantity", key: "quantity", type: "number" },
    { label: "Cost Price", key: "cost_price", type: "number" },
    { label: "Expiration Date", key: "expiration_date", type: "date" },
    { label: "Category", key: "category", type: "select" },
    { label: "Supplier", key: "supplier", type: "select" },
  ];

  const [formData, setFormData] = useState<{ [key: string]: any }>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(product.image || undefined);
  const [selectedImageURL, setSelectedImageURL] = useState<string | undefined>(product.image_url || undefined);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [supplier, setSupplier] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchSuppliers();
      fetchCategories();
      setFormData(initialData);
    }
  }, [isOpen, product]);

  const handleImageSelect = (imageId: string, imageURL: string) => {
    const parsedId = parseInt(imageId);
    setSelectedImageId(parsedId);
    setSelectedImageURL(imageURL);
    setFormData({ ...formData, image: parsedId });
  };

  const handleChange =
    (key: string) =>
    (e: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = typeof e === "string" ? e : e.target.value;
      setFormData({ ...formData, [key]: value });
    };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      const value = formData[field.key];
      if (
        field.key !== "expiration_date" &&
        (!value || (typeof value === "string" && !value.trim()))
      ) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalData = {
      ...formData,
      category: formData.category || undefined,
      supplier: formData.supplier || undefined,
      image: selectedImageId || undefined,
      expiration_date: formData.expiration_date || null,
    };

    try {
      if (!token) throw new Error("Token not found");

      const endpoint = `/api/products/${product.id}/`; // Replace with correct endpoint
      const response = await dataFetch(endpoint, "PUT", finalData, token);
      if (response) {
        onChanges(response);
        console.log("Product updated:", response);
      } else {
        console.log("Product not updated:", response);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }

    onClose();
  };

  const fetchSuppliers = async () => {
    try {
      const suppliers = (await dataFetch("api/suppliers/", "GET", {}, token!)) as Supplier[];
      setSupplier(suppliers);
      console.log("Fetched suppliers:", suppliers);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = (await dataFetch("api/categories/", "GET", {}, token!)) as Category[];
      setCategories(categories);
      console.log("Fetched categories:", categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-1 gap-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  onValueChange={handleChange(field.key)}
                  value={formData[field.key]?.toString() || ""}
                >
                  <SelectTrigger
                    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors[field.key] ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder={`Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{field.label}</SelectLabel>
                      {field.key === "category" &&
                        categories?.map((option) => (
                          <SelectItem key={option.id} value={String(option.id)}>
                            {option.name}
                          </SelectItem>
                        ))}
                      {field.key === "supplier" &&
                        supplier?.map((option) => (
                          <SelectItem key={option.id} value={String(option.id)}>
                            {option.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleChange(field.key)}
                  type={field.type || "text"}
                  placeholder={`Enter ${field.label}`}
                  className={`border ${errors[field.key] ? "border-rose-500" : ""}`}
                />
              )}
              {errors[field.key] && (
                <span className="text-xs tracking-wide font-medium text-red-500">
                  {errors[field.key]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <Label>Select Image</Label>
          <div
            className="w-full h-40 flex items-center justify-center border border-gray-300 p-2 rounded-md"
            onClick={() => setIsImageManagerOpen(true)} // Open ImageManager
          >
            {selectedImageURL ? (
              <img
                src={selectedImageURL}
                alt="Selected"
                className="max-h-full object-contain"
              />
            ) : (
              <img src={placeholder} className="max-h-full object-contain" />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 text-white"
            disabled={!formData.name || !formData.price}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Image Manager Dialog */}
      <ImageManager
          isOpen={isImageManagerOpen}
          onClose={() => setIsImageManagerOpen(false)}
          onSelectImage={handleImageSelect}
        />
    </Dialog>
  );
};

export default EditProducts;
