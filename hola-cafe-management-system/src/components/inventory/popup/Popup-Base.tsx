import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PopupBaseProps {
  title: string;
  initialData: any;
  fields: Array<{ label: string; key: string; type?: string }>;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const PopupBase: React.FC<PopupBaseProps> = ({ title, initialData, fields, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); 

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [key]: e.target.value });

    // Clear the specific error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [key]: '' }));
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    fields.forEach((field) => {
      if (!formData[field.key].trim()) {
        newErrors[field.key] = 'This Field is Required'; // Set error message for empty fields
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Clear the errors after 3 seconds
      setTimeout(() => {
        setErrors({});
      }, 3000);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Fill in the details.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="grid grid-cols-1 gap-2">
              <Label htmlFor={field.key} className="text-left">{field.label}</Label>
              <Input
                id={field.key}
                value={formData[field.key]}
                onChange={handleChange(field.key)}
                type={field.type || 'text'}
                className={`border ${
                  errors[field.key] ? 'border-red-500' : 'border-gray-300'
                } rounded-md p-2`}
                placeholder={`Enter ${field.label}`}
              />
              {/* Display error message */}
              {errors[field.key] && (
                <span className="text-red-500 text-sm">{errors[field.key]}</span>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} type="button" className="w-full">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopupBase;
