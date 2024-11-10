import React from "react";
import { Menu } from "lucide-react";
import { Product } from "@/models/product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderCrudProps {
  onOpenPopup: (popup: "open" | "close", product: Product) => void;
  onOpenCategoryPopup: (popup: "open" | "close") => void;
  onOpenSupplierPopup: (popup: "open" | "close") => void;
}

const HeaderCrud = ({
  onOpenPopup,
  onOpenCategoryPopup,
  onOpenSupplierPopup,
}: HeaderCrudProps) => {
  const handleAddProduct = () => {
    onOpenPopup("open", {} as Product);
  };

  const handleAddCategory = () => {
    onOpenCategoryPopup("open");
  };

  const handleAddSupplier = () => {
    onOpenSupplierPopup("open");
  };

  return (
    <div className="flex flex-row space-x-2">
      <div className="flex flex-row w-full rounded-lg bg-background space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="h-full w-full text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleAddProduct}>
              Add Product
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddCategory}>
              Add Category
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddSupplier}>
              Add Supplier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HeaderCrud;
