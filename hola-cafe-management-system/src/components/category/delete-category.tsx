import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";
import { Category } from "@/models/category";
import { CircleCheck, X } from "lucide-react";
import { toast } from "sonner";

interface DeleteCategoryProps {
  isOpen: boolean;
  category: Category;
  onClose: () => void;
  onUpdate: () => void;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({
  isOpen,
  category,
  onClose,
  onUpdate,
}) => {
  const { token } = useAuth();

  console.log("category", category);

  const handleDeleteConfirmation = async () => {
    if (category) {
      try {
        const apiUrl = `/api/categories/${category.id}/`;
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await dataFetch(apiUrl, "DELETE", {}, token);
        toast.success("Category successfully deleted", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
        });
        onUpdate();
      } catch (error) {
        toast.error("Failed to delete category", {
          icon: <X className="text-red-500" />,
          className: "bg-white text-red-500 ",
        });
      }
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-gray-800">
            This action cannot be undone. Are you sure you want to permanently
            delete <span className="font-semibold">{category.name}</span> from
            our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
          <Button
            className="bg-custom-char hover:bg-custom-charcoalOlive"
            type="submit"
            onClick={handleDeleteConfirmation}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
