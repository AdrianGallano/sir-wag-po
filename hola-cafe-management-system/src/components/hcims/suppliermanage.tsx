import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Pen, Trash2 } from "lucide-react";

interface SupplierMangerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSupplier: null;
}

const SupplierManger: React.FC<SupplierMangerProps> = ({
  isOpen,
  onClose,
  onSelectSupplier,
}) => {
  return (
    <>
      {" "}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-4 ">
          <DialogHeader className="mb-2">
            <DialogTitle>
              <h2 className="text-xl font-semibold">Supplier Manager</h2>
            </DialogTitle>
            <DialogDescription>Some text for what this shit</DialogDescription>
          </DialogHeader>
          <div className="min-h-44">
            {/* list of categories here */}
            <div className="flex space-x-2  border-b border-gray-300 p-2">
              <div className="grid flex-1 gap-2  ">
                <p>Hello world</p>
              </div>
              <Button type="submit" size="sm" className="px-3">
                <Pen />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                type="submit"
                size="sm"
                className="px-3 bg-red-500 hover:bg-red-400"
              >
                <Trash2 className="text-white" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupplierManger;
