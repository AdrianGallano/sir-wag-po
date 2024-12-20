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
import { Supplier } from "@/models/supplier";
import { Category } from "@/models/category";
import { Stock } from "@/models/stock";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import {
  CheckCheck,
  CircleCheck,
  CircleCheckBig,
  ImagePlus,
  X,
} from "lucide-react";
import ImageManager from "../image/image-manager";

interface EditStockProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
  onChanges: () => void;
}

const EditStock = ({ isOpen, onClose, stock, onChanges }: EditStockProps) => {
  const { token, id } = useAuth();

  const initialData = {
    name: stock.name || "",
    description: stock.description || "",
    unit_price: stock.unit_price || "",
    quantity: stock.quantity || "",
    expiration_date: stock.expiration_date || null,
    supplier: stock.supplier.id,
    user: id,
    image: stock.image || "",
  };

  const fields = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Unit price", key: "unit_price", type: "number" },
    { label: "Quantity", key: "quantity", type: "number" },
    { label: "Expiration Date", key: "expiration_date", type: "date" },
    { label: "Supplier", key: "supplier", type: "select" },
  ];

  const [formData, setFormData] = useState<{ [key: string]: any }>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(
    Number(stock.image?.id)
  );
  const [selectedImageURL, setSelectedImageURL] = useState<string | undefined>(
    stock.image?.image_url
  );
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [supplier, setSupplier] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchSuppliers();
      fetchCategories();
      setFormData(initialData);
    }
  }, [isOpen, stock]);

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
      expiration_date: formData.expiration_date
        ? new Date(formData.expiration_date).toISOString()
        : null,
    };

    try {
      console.log("Final data:", finalData);
      if (!token) throw new Error("Token not found");

      const endpoint = `/api/stocks/${stock.id}/`;
      const response = await dataFetch(endpoint, "PUT", finalData, token);
      if (response) {
        onChanges();
        toast.success("Stock successfully updated", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
        console.log("Stock updated:", response);

        toast("Successfully update stock!", {
          duration: 1000,
          icon: <CircleCheckBig className="text-green-500" />,
          className: "bg-white text-black",
        });
      } else {
        console.log("Stock not updated:", response);
      }
    } catch (error) {
      toast.error("Failed to update stock", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
      toast("Failed to update stock!", {
        duration: 1000,
        icon: <X className="text-red-500" />,
        className: "bg-white text-black",
      });
      console.error("Error updating stock:", error);
    }

    onClose();
  };

  const fetchSuppliers = async () => {
    try {
      const suppliers = (await dataFetch(
        "api/suppliers/",
        "GET",
        {},
        token!
      )) as Supplier[];
      setSupplier(suppliers);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
    }
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
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Stock</DialogTitle>
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

      <Toaster position="top-right" />
    </Dialog>
  );
};

export default EditStock;
