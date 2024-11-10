import { Product } from "@/models/product";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-service";
import EditProducts from "../inventory/popup/EditProducts";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import StockStatus from "./stockstatus";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useAuth } from "@/context/authContext";
import PopupBase from "../inventory/popup/Popup-Base";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import placeholder from "./../../assets/images/placeholder.png";

interface ProductPreviewProps {
  product: Product | null;
  categories: Category[];
  suppliers: Supplier[];
  onClose: () => void;
  onproductDeleted: () => void;
  onproductUpdated: () => void;
}

const ProductPreview = ({
  product: initialProduct,
  categories,
  suppliers,
  onClose,
  onproductDeleted,
  onproductUpdated,
}: ProductPreviewProps) => {
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(
    product?.image?.image_url || ""
  );
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const threshold = product?.quantity || 100;
  const { token } = useAuth();

  // monitor product changes
  useEffect(() => {
    if (!product) {
      onClose();
    }
  }, [product]);

  // updating products
  const updateProduct = async (data: Product) => {
    try {
      const endpoint = `/api/products/${data.id}/`;
      if (!token) throw new Error("Token not found in response");

      const response = await dataFetch(endpoint, "PUT", data, token);
      console.log("Product updated:", response);
      setProduct(response as Product);
      toast.success("Product updated successfully");
      onproductUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditProductSubmit = (data: Product) => {
    console.log("Edited Product Data:", data);
    updateProduct(data);
    setIsEditPopupOpen(false);
  };

  // deleting products
  const deleteProducts = async () => {
    if (product) {
      const endpoint = `/api/products/${product.id}/`;
      try {
        if (!token) throw new Error("Token not found in response");
        toast.success("Product deleted successfully");
        await dataFetch(endpoint, "DELETE", {}, token);
        console.log("Product deleted:", product.name);
        // reset the product state
        setProduct(null);
        onproductDeleted();
        onClose();
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setIsDeletePopupOpen(false);
      }
    }
  };

  if (!product) return null;

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

        <SheetDescription className="w-full">
          <img
            src={selectedImageUrl || placeholder}
            alt={product.name}
            className="w-full h-52 rounded-md border border-gray-300 object-contain"
          />
        </SheetDescription>

        <SheetTitle className="md:text-3xl sm:text-sm">
          {toTitleCase(product.name)}
        </SheetTitle>
        <SheetDescription className="md:text-base sm:text-sm text-gray-600">
          {product.description}
        </SheetDescription>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <SheetDescription className="space-y-1 w-full">
          <div>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Price:</span> {product.price}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Cost Price:</span> {product.cost_price}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Quantity:</span> {product.quantity}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Expiration Date:</span>{" "}
              {dateFormatter(product.expiration_date)}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Category:</span> {toTitleCase(product.category.name)}
            </p>

            <Popover>
              <PopoverTrigger>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Supplier:</span> {toTitleCase(product.supplier.name)}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Name:</span> {toTitleCase(product.supplier.name)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Contact Person:</span>{" "}
                  {toTitleCase(product.supplier.contact_person)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Phone Number:</span>{" "}
                  {toTitleCase(product.supplier.phone_number)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Address:</span> {toTitleCase(product.supplier.address)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Email:</span> {toTitleCase(product.supplier.email)}
                </p>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full flex justify-center">
            <StockStatus
              quantity={parseFloat(product.quantity)}
              threshold={parseFloat(threshold as string)}
            />
          </div>
        </SheetDescription>
      </SheetHeader>

      {isEditPopupOpen && (
        <EditProducts
          product={product}
          onClose={() => setIsEditPopupOpen(false)}
          onSubmit={handleEditProductSubmit}
          categories={categories}
          suppliers={suppliers}
          onOpenImageManager={() => setSelectedImageUrl(undefined)}
        />
      )}

      {isDeletePopupOpen && (
        <PopupBase
          title="Delete Product"
          actionType="delete"
          product={product}
          onSubmit={deleteProducts}
          onClose={() => setIsDeletePopupOpen(false)}
          popupType={"product"}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default ProductPreview;
