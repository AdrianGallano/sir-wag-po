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
import { CircleCheck, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import ImageManager from "../image/image-manager";

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

    // Clear previous error for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: "",
    }));

    // Special handling for price
    if (key === "price") {
      const numericValue = parseFloat(value);

      if (isNaN(numericValue) || numericValue < 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: "Price cannot be negative.",
        }));
      } else {
        setFormData({ ...formData, [key]: numericValue });
      }

      return;
    }

    // Update other fields
    setFormData({ ...formData, [key]: value });

    // Log category selection for debugging
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

    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      fields.forEach((field) => {
        const value = formData[field.key];
        if (!value || (typeof value === "string" && !value.trim())) {
          newErrors[field.key] = `${field.label} is required`;
        }
      });
  
      // Special validation for numeric fields
      if (formData.price && isNaN(Number(formData.price))) {
        newErrors.price = "Price must be a number";
      }

      if (formData.price && (isNaN(Number(formData.price)) || Number(formData.price) < 0)) {
        newErrors.price = "Price must be a non-negative number";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = async () => {
    if (!validateForm()) return;
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
      if (!token) throw new Error("Token not found");
      const endpoint = "/api/products/";

      const response = await dataFetch(endpoint, "POST", finalData, token);
      console.log("Product added", response);
      if (response != null) {
        toast("Product successfully added", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
        });
        onUpdate();
      }
    } catch (error) {
      toast.error("Failed to add product", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
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
        <div className="mb-4 max-w-full">
          <Label>Image</Label>
          <div
            className="max-w-sm mx-auto mt-1 h-fit min-h-52 flex items-center justify-center border border-dashed border-gray-300 p-2 rounded-md"
            onClick={() => setIsImageManagerOpen(true)}
          >
            <div className="text-center  w-full h-full ">
              {selectedImageURL ? (
                <div className="rounded-md flex justify-center items-center aspect-square overflow-hidden">
                <img
                  src={selectedImageURL}
                  alt="Selected"
                  className="object-cover w-full h-full"
                />
              </div>
              
              ) : (
                <ImagePlus className="mx-auto h-12 w-12" />
              )}
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer"
                >
                  <span>Select</span>
                  <span className="text-indigo-600"> or add</span>
                  <span> an image.</span>
                </label>
              </h3>
            </div>
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
