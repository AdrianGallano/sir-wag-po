import React, { useEffect, useState } from "react";
import ImageManager from "./ImageManager";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from "@/models/product";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@/index.css";
import CategoryManager from "@/components/hcims/categorymanager";
import SupplierManger from "@/components/hcims/suppliermanage";

interface PopupBaseProps {
  title: string;
  initialData?: any;
  fields?: Array<{
    label: string;
    key: string;
    type?: string;
    options?: Array<{ id: string | number; label: string }>;
  }>;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isNeededToOpen?: boolean;
  popupType: "product" | "category" | "supplier";
  categories?: Array<{ id: number; label: string }>;
  suppliers?: Array<{ id: number; label: string }>;
  children?: React.ReactNode;
  product?: Product;
  actionType?: "delete" | "other";
  category?: any;
  supplier?: any;
}

const PopupBase: React.FC<PopupBaseProps> = ({
  title,
  initialData = {},
  fields = [],
  onClose,
  onSubmit,
  isNeededToOpen = false,
  popupType,
  product,
  categories,
  suppliers,
  actionType = "other", // Default to 'other' if not specified
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [isSupplierManagerOpen, setIsSupplierManagerOpen] = useState(false);

  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(
    undefined
  );
  const [selectedImageURL, setSelectedImageURL] = useState<string | undefined>(
    undefined
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (product) {
      setFormData(product);
      console.log("Product:", product);
    }
  }, [product]);

  const handleChange =
    (key: string) =>
    (e: string | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = typeof e === "string" ? e : e.target.value;
      setFormData({ ...formData, [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));

      if (key === "category") {
        const selectedCategory = (categories ?? []).find(
          (category) => category.id === Number(value)
        );
        if (selectedCategory) {
          console.log(
            `Category Selected: ID = ${selectedCategory.id}, Label = ${selectedCategory.label}`
          );
        }
      } else if (key === "supplier") {
        const selectedSupplier = (suppliers ?? []).find(
          (supplier) => supplier.id === Number(value)
        );
        if (selectedSupplier) {
          console.log(
            `Supplier Selected: ID = ${selectedSupplier.id}, Label = ${selectedSupplier.label}`
          );
        }
      }
    };

  const handleImageSelect = (imageId: string, imageURL: string) => {
    const parsedId = parseInt(imageId);
    setSelectedImageId(parsedId);
    setSelectedImageURL(imageURL);
    setFormData({ ...formData, image: parsedId, image_url: imageURL });
  };

  const handleSubmit = () => {
    if (actionType === "delete") {
      onSubmit(formData);
      console.log("This is the product:", formData);
      onClose();
      return;
    }

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
    console.log("Form Data:", formData);

    const finalData = {
      ...formData,
      category: formData.category || undefined,
      supplier: formData.supplier || undefined,
      image: selectedImageId || undefined,
      expiration_date: formData.expiration_date || null,
    };

    onSubmit(finalData);
    onClose();
  };

  const dialogConfig = {
    product: {
      label: "Open Image Manager",
      openState: isImageManagerOpen,
      setOpen: setIsImageManagerOpen,
      className: "bg-red-500",
    },
    category: {
      label: "Open Category Manager",
      openState: isCategoryManagerOpen,
      setOpen: setIsCategoryManagerOpen,
    },
    supplier: {
      label: "Open Supplier Manager",
      openState: isSupplierManagerOpen,
      setOpen: setIsSupplierManagerOpen,
    },
  };

  const renderDialogTrigger = (type: "product" | "category" | "supplier") => {
    const { label, setOpen } = dialogConfig[type];
    return (
      <Dialog>
        <DialogTrigger
          onClick={() => setOpen(true)}
          className="mb-4 bg-custom-charcoalOlive py-1 px-2 rounded-md text-white "
        >
          {label}
        </DialogTrigger>
      </Dialog>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {/* This is the delete Product will render */}
            {actionType === "delete" && product
              ? `Are you sure you want to delete "${product.name}"?`
              : "Fill in the details."}
          </DialogDescription>
        </DialogHeader>
        {/* This is for other i.e create, edit(All with input fields) */}
        {actionType !== "delete" && (
          <>
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
                              <SelectItem
                                key={option.id}
                                value={String(option.id)}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          {field.key === "supplier" &&
                            suppliers?.map((option) => (
                              <SelectItem
                                key={option.id}
                                value={String(option.id)}
                              >
                                {option.label}
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

            {selectedImageURL && (
              <div className="mb-4">
                <Label>Selected Image</Label>
                <div className="w-full h-40 flex items-center justify-center border border-gray-300 p-2">
                  <img
                    src={selectedImageURL}
                    alt="Selected"
                    className="max-h-full object-contain"
                  />
                </div>
              </div>
            )}

            {isNeededToOpen && popupType && renderDialogTrigger(popupType)}
          </>
        )}

        <DialogFooter>
          {actionType === "delete" ? (
            <>
              <Button onClick={() => onSubmit(formData)} variant="destructive">
                Yes
              </Button>
              <Button onClick={onClose} variant="secondary">
                No
              </Button>
            </>
          ) : (
            <Button
              onClick={handleSubmit}
              className="mb-2 bg-custom-sunnyGold text-custom-charcoalOlive hover:bg-custom-sunnyGold"
            >
              Save changes
            </Button>
          )}
        </DialogFooter>

        <ImageManager
          isOpen={isImageManagerOpen}
          onClose={() => setIsImageManagerOpen(false)}
          onSelectImage={handleImageSelect}
        />

        <CategoryManager
          isOpen={isCategoryManagerOpen}
          onClose={() => setIsCategoryManagerOpen(false)}
        />

        <SupplierManger
          isOpen={isSupplierManagerOpen}
          onClose={() => setIsSupplierManagerOpen(false)}
          onSelectSupplier={null}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PopupBase;
