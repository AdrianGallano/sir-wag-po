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
    { label: "Supplier Name", key: "name", type: "text" },
    { label: "Description", key: "description", type: "textarea" },
    { label: "Contact Person", key: "contact_person", type: "text" },
    { label: "Phone Number", key: "phone_number", type: "text" },
    { label: "Address", key: "address", type: "textarea" },
    { label: "Email", key: "email", type: "text" },
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
      popupType="supplier"
      onClose={onClose}
      onSubmit={handleSubmit}
      isNeededToOpen={true}
    />
  );
};

export default EditSupplier;
