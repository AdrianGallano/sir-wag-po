import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { Category } from "@/models/category";

interface EditSupplierProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  onChanges: () => void;
}

const EditCategory = ({
  isOpen,
  onClose,
  category,
  onChanges,
}: EditSupplierProps) => {
  const { token, id } = useAuth();

  const initialData = {
    name: category.name || "",
    description: category.description || "",
    user: id,
  };

  const fields = [
    { label: "Name", key: "name", type: "text" },
    { label: "Description", key: "description", type: "text" },
  ];

  const [formData, setFormData] = useState<{ [key: string]: any }>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, category]);

  const handleChange =
    (key: string) =>
    (e: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = typeof e === "string" ? e : e.target.value;
      setFormData({ ...formData, [key]: value });
    };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalData = {
      ...formData,
    };

    try {
      if (!token) throw new Error("Token not found");

      const endpoint = `/api/categories/${category.id}/`;
      const response = await dataFetch(endpoint, "PUT", finalData, token);
      if (response) {
        onChanges();
        console.log("Category updated:", response);
      } else {
        console.log("Category not updated:", response);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-1 gap-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                value={formData[field.key] || ""}
                onChange={handleChange(field.key)}
                type={field.type || "text"}
                placeholder={`Enter ${field.label}`}
                className={`border ${
                  errors[field.key] ? "border-rose-500" : ""
                }`}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-green-600 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
