import React from 'react';
import { Category } from '../models/categories-interface';
import PopupBase from './Popup-Base';
interface CreateCategoryProps {
  category?: Category;
  onClose: () => void;
  onSubmit: (data: Category) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ category, onClose, onSubmit }) => {
  const fields = [
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
  ];

  return (
    <PopupBase
      title={`Add ${category ? category.name : 'New Category'}`}
      initialData={category || { name: '', description: '' }}
      fields={fields}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default CreateCategory;
