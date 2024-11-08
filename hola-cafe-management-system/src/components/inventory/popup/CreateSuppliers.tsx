import React from "react";
import { Supplier } from "../models/suppliers-interface";
import PopupBase from "./Popup-Base";

interface CreateSuppliersProps {
  supplier?: Supplier;
  onClose: () => void;
  onSubmit: (data: Supplier) => void;
}

const CreateSuppliers: React.FC<CreateSuppliersProps> = ({
  supplier,
  onClose,
  onSubmit,
}) => {
  const fields = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Contact Person", key: "contact_person" },
    { label: "Phone Number", key: "phone_number" },
    { label: "Address", key: "address" },
    { label: "Email", key: "email" },
  ];

  return (
    <PopupBase
      title={`Add ${supplier ? supplier.name : "New Supplier"}`}
      initialData={
        supplier || {
          name: "",
          description: "",
          contact_person: "",
          phone_number: "",
          address: "",
          email: "",
        }
      }
      fields={fields}
      isNeededToOpen={true}
      popupType="supplier"
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default CreateSuppliers;
