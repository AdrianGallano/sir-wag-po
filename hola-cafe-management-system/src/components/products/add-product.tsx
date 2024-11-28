import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Category } from "@/models/category";
import dataFetch from "@/services/data-service";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import placeholder from "@/assets/images/fileupload.png";
import ImageManager from "@/components/image-manager";

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onUpdate: () => void;
}

const AddProductForm = ({
  isOpen,
  onClose,
  categories,
  onUpdate,
}: AddProductFormProps) => {
  const { token, id } = useAuth();

  let initialData: { [key: string]: string | number | null } = {
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    user: id,
  };

  const fields = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "price", type: "number" },
    { label: "Category", key: "category", type: "select" },
  ];

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(
    undefined
  );
  const [selectedImageURL, setSelectedImageURL] = useState<string | undefined>(
    undefined
  );
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);

  const handleImageSelect = (imageId: string, imageURL: string) => {
    const parsedId = parseInt(imageId);
    setSelectedImageId(parsedId);
    setSelectedImageURL(imageURL);
    setFormData({ ...formData, image: parsedId, image_url: imageURL });
  };

  const handleChange =
    (key: string) =>
    (e: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = typeof e === "string" ? e : e.target.value;
      setFormData({ ...formData, [key]: value });

      if (key === "category") {
        const selectedCategory = (categories ?? []).find(
          (category) => category.id === Number(value)
        );
        if (selectedCategory) {
          console.log(
            `Category Selected: ID = ${selectedCategory.id}, Label = ${selectedCategory.name}`
          );
        }
      }
    };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalData = {
      ...formData,
      category: formData.category || undefined,
      image: selectedImageId || undefined,
    };

    try {
      console.log("Final Data:", finalData);
      if (!token) throw new Error("Token not found");

      const endpoint = "/api/products/";
      const response = await dataFetch(endpoint, "POST", finalData, token);
      if (response) {
        onUpdate();
        console.log("Product saved:", response);
      } else {
        console.log("Product not saved:", response);
      }
    } catch (error) {
      console.error("Error saving Product:", error);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-1 gap-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  onValueChange={handleChange(field.key)}
                  value={formData[field.key]?.toString() || ""} // Set initial selected value
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
                  className={`border ${
                    errors[field.key] ? "border-rose-500" : ""
                  }`}
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
            onClick={() => setIsImageManagerOpen(true)}
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
            className="bg-custom-char hover:bg-custom-charcoalOlive text-white"
          >
            Add Stock
          </Button>
        </DialogFooter>
        <ImageManager
          isOpen={isImageManagerOpen}
          onClose={() => setIsImageManagerOpen(false)}
          onSelectImage={handleImageSelect}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
