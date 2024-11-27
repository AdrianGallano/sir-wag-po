import React from "react";
import { Button } from "@/components/ui/button";
import { Supplier } from "@/models/supplier";
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

interface DeletePopupProps {
  isOpen: boolean;
  supplier: Supplier;
  onClose: () => void;
  onUpdate: () => void;
}

const DeleteSupplier: React.FC<DeletePopupProps> = ({
  isOpen,
  supplier,
  onClose,
  onUpdate,
}) => {
  const { token } = useAuth();

  const handleDeleteConfirmation = async () => {
    if (supplier) {
      try {
        const apiUrl = `/api/suppliers/${supplier.id}/`;
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await dataFetch(apiUrl, "DELETE", {}, token);
        console.log("Supplier deleted:", response);
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  console.log("Stock", supplier);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-gray-800">
            This action cannot be undone. Are you sure you want to permanently
            delete <span className="font-semibold">{supplier.name}</span> from
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

export default DeleteSupplier;
