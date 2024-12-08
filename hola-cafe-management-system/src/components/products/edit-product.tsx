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
import placeholder from "@/assets/images/fileupload.png";
import dataFetch from "@/services/data-service";
import { Category } from "@/models/category";
import Product from "@/models/product";
import { CircleCheck, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import ImageManager from "../image/image-manager";

interface EditProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onChanges: () => void;
}

const EditProduct = ({
  isOpen,
  onClose,
  product,
  onChanges,
}: EditProductProps) => {
  const { token, id } = useAuth();

  const initialData = {
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    image: product.image || "",
    category: product.category.id,
    user: id,
  };

  console.log("category", product.category.id);
  const fields = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "price", type: "number" },
    { label: "Category", key: "category", type: "select" },
  ];

  const [formData, setFormData] = useState<{ [key: string]: any }>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(
    Number(product.image?.id)
  );
  const [selectedImageURL, setSelectedImageURL] = useState<string | undefined>(
    product.image?.image_url
  );
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalData = {
      ...formData,
      category: formData.category || undefined,
    };

    try {
      console.log("finalData", finalData);
      if (!token) throw new Error("Token not found");

      const endpoint = `/api/products/${product.id}/`;
      const response = await dataFetch(endpoint, "PUT", finalData, token);
      if (response) {
        onChanges();
        toast("Stock successfully updated", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
      }
    } catch (error) {
      toast.error("Failed to update product", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
    }

    onClose();
  };

  const fetchCategories = async () => {
    try {
      const categories = (await dataFetch(
        "api/categories/",
        "GET",
        {},
        token!
      )) as Category[];
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
            className="hover:bg-custom-charcoalOlive bg-custom-char"
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

export default EditProduct;
