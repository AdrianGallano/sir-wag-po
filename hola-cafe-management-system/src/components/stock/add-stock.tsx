import { Button } from "@/components/ui/button";
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
import { Supplier } from "@/models/supplier";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import placeholder from "@/assets/images/fileupload.png";
import dataFetch from "@/services/data-service";
import { toast } from "sonner";
import { CheckCircle, CircleCheck, Image, ImagePlus, X } from "lucide-react";
import ImageManager from "../image/image-manager";
import { set } from "date-fns";

interface AddStockFormProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier[];
  onChanges: () => void;
}

const AddStockForm = ({
  isOpen,
  onClose,
  supplier = [],
  onChanges,
}: AddStockFormProps) => {
  const { token, id } = useAuth();

  let initialData: { [key: string]: string | number | null } = {
    name: "",
    description: "",
    quantity: "",
    unit_price: "",
    expiration_date: null,
    date_shelved: null,
    supplier: "",
    is_stocked_by: id,
    image: "",
    status: "In Stock",
  };

  const fields = [
    { label: "Name", key: "name", minLength: 3, maxLength: 255 },
    { label: "Description", key: "description", minLength: 3, maxLength: 255 },
    { label: "Unit price", key: "unit_price", type: "number" },
    { label: "Quantity", key: "quantity", type: "number" },
    { label: "Date Shelved", key: "date_shelved", type: "date" },
    { label: "Expiration Date", key: "expiration_date", type: "date" },
    { label: "Status", key: "status", readOnly: true },
    { label: "Supplier", key: "supplier", type: "select" },
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

      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));

      if (key === "supplier") {
        const selectedSupplier = (supplier ?? []).find(
          (supplier: { id: number }) => supplier.id === Number(value)
        );
      }
    };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    fields.forEach((field) => {
      const value = formData[field.key];

      if (
        field.key !== "expiration_date" &&
        field.key !== "date_shelved" &&
        (!value || (typeof value === "string" && !value.trim()))
      ) {
        newErrors[field.key] = `${field.label} is required`;
        return;
      }

      if (typeof value === "string") {
        if (field.minLength && value.trim().length < field.minLength) {
          newErrors[
            field.key
          ] = `${field.label} must be at least ${field.minLength} characters`;
        }
        if (field.maxLength && value.trim().length > field.maxLength) {
          newErrors[
            field.key
          ] = `${field.label} must be at most ${field.maxLength} characters`;
        }
      }

      if (field.type === "number" && value) {
        const numericValue = parseFloat(value.toString());
        if (isNaN(numericValue)) {
          newErrors[field.key] = `${field.label} must be a valid number`;
        }

        if (field.key === "unit_price" && numericValue <= 0) {
          newErrors[field.key] = `${field.label} must be greater than 0`;
        }

        if (field.key === "quantity" && numericValue <= 0) {
          newErrors[field.key] = `${field.label} must be greater than 0`;
        }
      }

      if (field.type === "date" && value) {
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          newErrors[field.key] = `${field.label} must be a valid date`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (!token) throw new Error("Token not found");

      const finalData = {
        ...formData,
        supplier: formData.supplier || undefined,
        image: selectedImageId || undefined,
        expiration_date: formData.expiration_date || null,
        is_stocked_by: id,
      };

      const endpoint = "/api/stocks/";
      const response = await dataFetch(endpoint, "POST", finalData, token);
      if (response) {
        onChanges();
        toast("Stock successfully added", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
        onClose();
      }
    } catch (error) {
      toast.error("Failed to add stock", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-1 gap-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.key === "status" ? (
                <Input
                  id={field.key}
                  value={formData[field.key] || ""}
                  readOnly
                  className="bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              ) : field.type === "select" ? (
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

export default AddStockForm;
