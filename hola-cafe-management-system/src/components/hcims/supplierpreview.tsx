import { Supplier } from "@/models/supplier";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toTitleCase } from "@/utils/formatter";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import PopupBase from "../inventory/popup/Popup-Base";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import EditSupplier from "../inventory/popup/EditSupplier";

interface SupplierPreviewProps {
  supplier: Supplier | null;
  onClose: () => void;
  onSupplierDeleted: () => void;
  onSupplierUpdated: () => void;
}

const SupplierPreview = ({
  supplier: initialSupplier,
  onClose,
  onSupplierDeleted,
  onSupplierUpdated,
}: SupplierPreviewProps) => {
  const [supplier, setSupplier] = useState<Supplier | null>(initialSupplier);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { token } = useAuth();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  // monitor product changes
  useEffect(() => {
    if (!supplier) {
      onClose();
    }
  }, [supplier]);

  // update supplier
  const updatesupplier = async (data: Supplier) => {
    try {
      const endpoint = `/api/suppliers/${data.id}/`;
      if (!token) throw new Error("Token not found in response");

      const response = await dataFetch(endpoint, "PUT", data, token);
      console.log("supplier updated:", response);
      setSupplier(response as Supplier);
      toast.success("supplier updated successfully");
      onSupplierUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  // delete supplier
  const deleteSupplier = async () => {
    if (supplier) {
      const endpoint = `/api/suppliers/${supplier.id}/`;
      try {
        if (!token) throw new Error("Token not found in response");
        toast.success("supplier deleted successfully");
        await dataFetch(endpoint, "DELETE", {}, token);
        console.log("supplier deleted:", supplier.name);
        // reset the supplier state
        setSupplier(null);
        onSupplierDeleted();
        onClose();
      } catch (error) {
        console.error("Error deleting supplier:", error);
      } finally {
        setIsDeletePopupOpen(false);
      }
    }
  };

  const handleEditSuppliertSubmit = (data: Supplier) => {
    console.log("Edited supplier Data:", data);
    updatesupplier(data);
    setIsEditPopupOpen(false);
  };

  if (!supplier) return null;

  return (
    <div className="w-full">
      <SheetHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative w-40 left-24 -top-10 bg-white p-2 border border-slate-400 rounded-md space-y-1">
            <DropdownMenuItem>
              <button
                className="text-slate-600"
                onClick={() => setIsEditPopupOpen(true)}
              >
                Edit
              </button>
            </DropdownMenuItem>
            <hr className="bg-gray-200" />
            <DropdownMenuItem>
              <button
                className="text-slate-600"
                onClick={() => setIsDeletePopupOpen(true)}
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <SheetDescription className="w-full" />
          <SheetTitle className="md:text-3xl sm:text-sm">
            {toTitleCase(supplier.name)}
          </SheetTitle>
          <SheetDescription className="md:text-base sm:text-sm text-gray-600">
            {supplier.description}
          </SheetDescription>

          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

          <SheetDescription className="space-y-1 w-full">
            <div>
              <p className="md:text-base sm:text-sm text-gray-600">
                <span>Name:</span> {toTitleCase(supplier.name)}
              </p>
              <p className="md:text-base sm:text-sm text-gray-600">
                <span>Contact Person:</span>{" "}
                {toTitleCase(supplier.contact_person)}
              </p>
              <p className="md:text-base sm:text-sm text-gray-600">
                <span>Phone Number:</span> {supplier.phone_number}
              </p>
              <p className="md:text-base sm:text-sm text-gray-600">
                <span>Address:</span> {toTitleCase(supplier.address)}
              </p>
              <p className="md:text-base sm:text-sm text-gray-600">
                <span>Email:</span> {supplier.email}
              </p>
            </div>
          </SheetDescription>
        </SheetHeader>

        {isEditPopupOpen && (
        <EditSupplier
          supplier={supplier}
          onClose={() => setIsEditPopupOpen(false)}
          onSubmit={handleEditSuppliertSubmit}
        />
      )}

        {isDeletePopupOpen && (
          <PopupBase
            title="Delete Supplier"
            actionType="delete"
            supplier={supplier}
            onSubmit={deleteSupplier}
            onClose={() => setIsDeletePopupOpen(false)}
            popupType={"supplier"}
          />
        )}

        <Toaster position="top-right" />
      </div>
  );
};

export default SupplierPreview;
