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
  categories?: Array<{ id: number; label: string }>;
  suppliers?: Array<{ id: number; label: string }>;
  children?: React.ReactNode;
  product?: Product;
  actionType?: "delete" | "other";
}

const PopupBase: React.FC<PopupBaseProps> = ({
  title,
  initialData = {},
  fields = [],
  onClose,
  onSubmit,
  isNeededToOpen = false,
  product,
  categories,
  suppliers,
  actionType = "other", // Default to 'other' if not specified
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(
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

  const handleImageSelect = (imageId: string) => {
    const parsedId = parseInt(imageId);
    setSelectedImageId(parsedId);
    setFormData({ ...formData, image: parsedId });
  };

  const handleSubmit = () => {
    if (actionType === "delete") {
      onSubmit(formData);
      onClose();
      return;
    }

    const newErrors: { [key: string]: string } = {};
    fields.forEach((field) => {
      const value = formData[field.key];
      if (!value || (typeof value === "string" && !value.trim())) {
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
    };

    onSubmit(finalData);
    onClose();
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
                    // <Select>
                    //   {/* <select
                    //     id={field.key}
                    //     value={formData[field.key] || ""}
                    //     onChange={handleChange(field.key)}
                    //     className={` flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${
                    //       errors[field.key] ? "border-red-500" : ""
                    //     }`}
                    //   >
                    //     <option
                    //       value=""
                    //       className="py-1.5 pl-8 pr-2 text-sm font-semibold"
                    //     >
                    //       Select {field.label}
                    //     </option>
                    //     {field.key === "category" &&
                    //       (categories ?? []).map((option) => (
                    //         <option
                    //           className="relative flex w-full cursor-default select-none items-center  py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-lg"
                    //           key={option.id}
                    //           value={option.id}
                    //         >
                    //           {option.label}
                    //         </option>
                    //       ))}
                    //     {field.key === "supplier" &&
                    //       (suppliers ?? []).map((option) => (
                    //         <option key={option.id} value={option.id}>
                    //           {option.label}
                    //         </option>
                    //       ))}
                    //   </select> */}
                    // </Select>
                    <Select onValueChange={handleChange(field.key)}>
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
                            (categories ?? []).map((option) => (
                              <SelectItem
                                key={option.id}
                                value={String(option.id)}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          {field.key === "supplier" &&
                            (suppliers ?? []).map((option) => (
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
                        errors[field.key] ? "border-red-500" : ""
                      }`}
                    />
                  )}
                  {errors[field.key] && (
                    <span className="text-red-500">{errors[field.key]}</span>
                  )}
                </div>
              ))}
            </div>
            {isNeededToOpen && (
              <Dialog>
                <DialogTrigger
                  onClick={() => setIsImageManagerOpen(true)}
                  className="mb-4"
                >
                  Open Image Manager
                </DialogTrigger>
              </Dialog>
            )}
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
            <Button onClick={handleSubmit} className="mb-2">
              Save changes
            </Button>
          )}
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

export default PopupBase;
