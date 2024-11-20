import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/models/product";
import { SquarePlus } from "lucide-react";

interface AddEntityDropdownProps {
  onOpenPopup: (popup: "open" | "close", product: Product) => void;
}

const AddEntityDropdown = ({ onOpenPopup }: AddEntityDropdownProps) => {
  const handleAddProduct = () => {
    onOpenPopup("open", {} as Product);
  };

  return (
    <div className="flex flex-row space-x-2">
      <div className="flex flex-row w-full rounded-lg bg-background space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SquarePlus className="h-9 w-9 text-custom-char" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleAddProduct}>
              Add Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AddEntityDropdown;
