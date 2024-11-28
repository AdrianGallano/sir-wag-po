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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { CircleCheck, X } from "lucide-react";
import { toast } from "sonner";

interface AddSupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onChanges: () => void;
}

const AddCategoryForm = ({
  isOpen,
  onClose,
  onChanges,
}: AddSupplierFormProps) => {
  const { token, id } = useAuth();

  let initialData: { [key: string]: string | number | null } = {
    name: "",
    description: "",
    user: id,
  };

  const fields = [
    { label: "Name", key: "name", type: "text" },
    { label: "Description", key: "description", type: "text" },
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

      const endpoint = "/api/categories/";
      const response = await dataFetch(endpoint, "POST", finalData, token);
      if (response) {
        toast("Category successfully added", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
        onChanges();
      }
    } catch (error) {
      toast.error("Failed to add category", {
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
          <DialogTitle>Add Category</DialogTitle>
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
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryForm;
