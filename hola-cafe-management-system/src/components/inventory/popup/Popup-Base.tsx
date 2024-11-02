import React, { useState } from 'react';
import ImageManager from './ImageManager';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PopupBaseProps {
  title: string;
  initialData: any;
  fields: Array<{ label: string; key: string; type?: string; options?: Array<{ id: string | number; label: string }> }>;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isNeededToOpen?: boolean; 
  categories: Array<{ id: number; label: string }>; 
  suppliers: Array<{ id: number; label: string }>; 
  children?: React.ReactNode;
}

const PopupBase: React.FC<PopupBaseProps> = ({
  title,
  initialData,
  fields,
  onClose,
  onSubmit,
  isNeededToOpen = false, 
  categories,  
  suppliers,   
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | undefined>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Handle form field changes
  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
  
    // Update formData and clear any existing errors for this field
    setFormData({ ...formData, [key]: value });
    setErrors((prev) => ({ ...prev, [key]: '' }));
  
    // Log the selected category or supplier ID and label
    if (key === 'category') {
      const selectedCategory = categories.find(category => category.id === Number(value));
      if (selectedCategory) {
        console.log(`Category Selected: ID = ${selectedCategory.id}, Label = ${selectedCategory.label}`);
      }
    } else if (key === 'supplier') {
      const selectedSupplier = suppliers.find(supplier => supplier.id === Number(value));
      if (selectedSupplier) {
        console.log(`Supplier Selected: ID = ${selectedSupplier.id}, Label = ${selectedSupplier.label}`);
      }
    }
  };
  
  // Handle image selection
  const handleImageSelect = (imageId: string) => {
    const parsedId = parseInt(imageId);
    setSelectedImageId(parsedId);
    setFormData({ ...formData, image: parsedId });
  };
  // Handle form submission
  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    fields.forEach((field) => {
      const value = formData[field.key];
      if (!value || (typeof value === 'string' && !value.trim())) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
          <DialogDescription>Fill in the details.</DialogDescription>
        </DialogHeader>

        {isNeededToOpen && (
          <Button onClick={() => setIsImageManagerOpen(true)} className="mb-4">
            Open Image Manager
          </Button>
        )}

        <div className="grid gap-4 py-4">
        {fields.map((field) => (
          <div key={field.key} className="grid grid-cols-1 gap-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.type === 'select' ? (
              <select
                id={field.key}
                value={formData[field.key] || ''}
                onChange={handleChange(field.key)}
                className={`border ${errors[field.key] ? 'border-red-500' : ''}`}
              >
                <option value="">Select {field.label}</option>
                {field.key === 'category' && categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
                {field.key === 'supplier' && suppliers.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.key}
                value={formData[field.key] || ''}
                onChange={handleChange(field.key)}
                type={field.type || 'text'}
                placeholder={`Enter ${field.label}`}
                className={`border ${errors[field.key] ? 'border-red-500' : ''}`} 
              />
            )}
            {errors[field.key] && <span className="text-red-500">{errors[field.key]}</span>}
          </div>
        ))}

        </div>
        
        <DialogFooter>
          <Button onClick={handleSubmit} className="mb-2">Save changes</Button>
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
