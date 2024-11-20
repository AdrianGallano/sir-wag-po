import React from "react";
import { Button } from "@/components/ui/button";

interface DeletePopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
