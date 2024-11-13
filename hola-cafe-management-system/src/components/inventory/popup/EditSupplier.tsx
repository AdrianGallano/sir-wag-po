import React, { useEffect, useState } from "react";
import { Supplier } from "@/models/supplier";
import PopupBase from "./Popup-Base";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

interface EditSupplierProps {
  supplier: Supplier;
  onClose: () => void;
  onSubmit: (data: Supplier) => void;
}

const EditSupplier: React.FC<EditSupplierProps> = ({
  supplier,
  onClose,
  onSubmit,
}) => {
  const [initialData, setInitialData] = useState<Supplier | null>(null);

  // Define the fields for the form
  const fields = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "price", type: "number" },
    { label: "Quantity", key: "quantity", type: "number" },
    { label: "Cost Price", key: "cost_price", type: "number" },
    { label: "Expiration Date", key: "expiration_date", type: "date" },
    { label: "Category", key: "category", type: "select" },
    { label: "Supplier", key: "supplier", type: "select" },
  ];

  // Handle form submission
  const handleSubmit = (data: any) => {
    const updatedSupplier = {
      ...supplier,
      ...data,
    };

    // Call the onSubmit function with the updated supplier
    onSubmit(updatedSupplier);
  };

  return (
    <PopupBase
      title="Edit Supplier"
      initialData={initialData || supplier}
      fields={fields}
      onClose={onClose}
      onSubmit={handleSubmit}
      isNeededToOpen={true}
    />
  );
};

export default EditSupplier;
