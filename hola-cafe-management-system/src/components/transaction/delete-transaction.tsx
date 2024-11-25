import React from "react";
import { Button } from "@/components/ui/button";
import Transaction from "@/models/transaction";
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
  transaction: Transaction;
  onClose: () => void;
  onUpdate: () => void;
}

const Deletetransaction: React.FC<DeletePopupProps> = ({
  isOpen,
  transaction,
  onClose,
  onUpdate,
}) => {
  const { token } = useAuth();

  const handleDeleteConfirmation = async () => {
    if (transaction) {
      try {
        const apiUrl = `/api/transactions/${transaction.id}/`;
        if (!token) {
          console.error("Token not found");
          return;
        }

        const response = await dataFetch(apiUrl, "DELETE", {}, token);
        console.log("transaction deleted:", response);
        onUpdate();
        onClose();
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  console.log("transaction", transaction);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-gray-800">
            This action cannot be undone. Are you sure you want to permanently
            delete this transactin from our servers?
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

export default Deletetransaction;
