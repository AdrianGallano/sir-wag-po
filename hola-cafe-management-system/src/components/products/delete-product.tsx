import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";
import Product from "@/models/product";
import { CircleCheck, X } from "lucide-react";
import { toast } from "sonner";

interface DeleteProductProps {
  isOpen: boolean;
  product: Product;
  onClose: () => void;
  onUpdate: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({
  isOpen,
  product,
  onClose,
  onUpdate,
}) => {
  const { token } = useAuth();

  const handleDeleteConfirmation = async () => {
    if (product) {
      try {
        const apiUrl = `/api/products/${product.id}/`;
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await dataFetch(apiUrl, "DELETE", {}, token);
        toast.success("Product successfully deleted", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
        });
        onUpdate();
      } catch (error) {
        toast.error("Failed to delete product", {
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
            delete <span className="font-semibold">{product.name}</span> from
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

export default DeleteProduct;
