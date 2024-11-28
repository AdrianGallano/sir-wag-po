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
import { Supplier } from "@/models/supplier";
import { CircleCheck, X } from "lucide-react";
import { toast } from "sonner";

interface EditSupplierProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier;
  onChanges: () => void;
}

const EditSupplier = ({
  isOpen,
  onClose,
  supplier,
  onChanges,
}: EditSupplierProps) => {
  const { token, id } = useAuth();

  const initialData = {
    name: supplier.name || "",
    description: supplier.description || "",
    contact_person: supplier.contact_person || "",
    phone_number: supplier.phone_number || "",
    address: supplier.address || null,
    email: supplier.email,
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

  const [formData, setFormData] = useState<{ [key: string]: any }>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, supplier]);

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

      const endpoint = `/api/suppliers/${supplier.id}/`;
      const response = await dataFetch(endpoint, "PUT", finalData, token);
      if (response) {
        onChanges();
        toast("Supplier successfully updated", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
      }
    } catch (error) {
      toast.error("Failed to update supplier", {
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
          <DialogTitle>Edit Product</DialogTitle>
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
          <Button
            onClick={handleSubmit}
            className="hover:bg-custom-charcoalOlive bg-custom-char"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSupplier;
