import React, { useEffect, useState } from "react";
import { Category } from "@/models/category";
import PopupBase from "./Popup-Base";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

interface EditCategoryProps {
  category: Category;
  onClose: () => void;
  onSubmit: (data: Category) => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  category,
  onClose,
  onSubmit,
}) => {
  const [initialData, setInitialData] = useState<Category | null>(null);

  // Define the fields for the form
  const fields = [
    { label: "Category Name", key: "name", type: "text" },
    { label: "Description", key: "description", type: "textarea" },
  ];

  // Handle form submission
  const handleSubmit = (data: any) => {
    const updatedCategory = {
      ...category,
      ...data,
    };

    // Call the onSubmit function with the updated category
    onSubmit(updatedCategory);
  };

  return (
    <PopupBase
      title="Edit Category"
      initialData={initialData || category}
      fields={fields}
      popupType="category"
      onClose={onClose}
      onSubmit={handleSubmit}
      isNeededToOpen={true}
    />
  );
};

export default EditCategory;
