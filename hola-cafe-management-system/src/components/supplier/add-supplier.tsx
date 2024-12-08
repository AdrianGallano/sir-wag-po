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
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import placeholder from "@/assets/images/fileupload.png";
import dataFetch from "@/services/data-service";
import ImageManager from "@/components/image/image-manager";
import { CircleCheck, X } from "lucide-react";
import { toast } from "sonner";

interface AddSupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onChanges: () => void;
}

const AddSupplierForm = ({
  isOpen,
  onClose,
  onChanges,
}: AddSupplierFormProps) => {
  const { token, id } = useAuth();

  let initialData: { [key: string]: string | number | null } = {
    name: "",
    description: "",
    contact_person: "",
    phone_number: "",
    address: "",
    email: "",
    user: id,
  };

  const fields = [
    { label: "Name", key: "name", type: "text" },
    { label: "Description", key: "description", type: "text" },
    { label: "Contact Person", key: "contact_person", type: "text" },
    { label: "Phone Number", key: "phone_number", type: "number" },
    { label: "Address", key: "address", type: "text" },
    { label: "Email", key: "email", type: "email" },
  ];

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    };

    try {
      if (!token) throw new Error("Token not found");

      const endpoint = "/api/suppliers/";
      const response = await dataFetch(endpoint, "POST", finalData, token);
      if (response) {
        onChanges();
        toast("Supplier successfully added", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
      }
    } catch (error) {
      toast.error("Failed to add supplier", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
    }

    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
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
              {errors[field.key] && (
                <span className="text-xs tracking-wide font-medium text-red-500">
                  {errors[field.key]}
                </span>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="mb-2 bg-custom-char text-white hover:bg-custom-charcoalOlive"
          >
            Add Supplier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierForm;
