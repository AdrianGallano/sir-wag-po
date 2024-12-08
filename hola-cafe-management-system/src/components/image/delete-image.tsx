import React from "react";
import { Button } from "@/components/ui/button";
import { Supplier } from "@/models/supplier";
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
import { CircleCheck, X } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@/models/image";

interface DeleteImageProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  image: Image;
}

const DeleteImage: React.FC<DeleteImageProps> = ({
  isOpen,
  onClose,
  onUpdate,
  image,
}) => {
  const { token } = useAuth();
  console.log("Image:", image);
  const handleDeleteImage = async () => {
    const endpoint = `/api/images/${image.id}/`;

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await dataFetch(endpoint, "DELETE", {}, token);
      console.log("Image deleted:", response);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error deleting image:", error);
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
            delete this from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
          <Button
            className="bg-custom-char hover:bg-custom-charcoalOlive"
            type="submit"
            onClick={handleDeleteImage}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteImage;
