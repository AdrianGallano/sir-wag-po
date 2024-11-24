import { Category } from "@/models/category";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toTitleCase } from "@/utils/formatter";
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
import EditCategory from "../inventory/popup/EditCategories";

interface CategoryPreviewProps {
  category: Category | null;
  onClose: () => void;
  onCategoryDeleted: () => void;
  onCategoryUpdated: () => void;
}

const CategoryPreview = ({
  category: initialCategory,
  onClose,
  onCategoryDeleted,
  onCategoryUpdated,
}: CategoryPreviewProps) => {
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { token } = useAuth();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  // monitor product changes
  useEffect(() => {
    if (!category) {
      onClose();
    }
  }, [category]);

  // update category
  const updateCategory = async (data: Category) => {
    try {
      const endpoint = `/api/categories/${data.id}/`;
      if (!token) throw new Error("Token not found in response");

      const response = await dataFetch(endpoint, "PUT", data, token);
      console.log("Category updated:", response);
      setCategory(response as Category);
      toast.success("Category updated successfully");
      onCategoryUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };

  // delete category
  const deleteCategory = async () => {
    if (category) {
      const endpoint = `/api/categories/${category.id}/`;
      try {
        if (!token) throw new Error("Token not found in response");
        toast.success("category deleted successfully");
        await dataFetch(endpoint, "DELETE", {}, token);
        console.log("category deleted:", category.name);
        // reset the category state
        setCategory(null);
        onCategoryDeleted();
        onClose();
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setIsDeletePopupOpen(false);
      }
    }
  };

  const handleEditCategprytSubmit = (data: Category) => {
    console.log("Edited Category Data:", data);
    updateCategory(data);
    setIsEditPopupOpen(false);
  };

  if (!category) return null;

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
          <SheetTitle className="md:text-3xl sm:text-sm">
            {toTitleCase(category.name)}
          </SheetTitle>
          <SheetDescription className="md:text-base sm:text-sm text-gray-600">
            {category.description}
          </SheetDescription>
        </SheetDescription>
      </SheetHeader>

      {isEditPopupOpen && (
        <EditCategory
          category={category}
          onClose={() => setIsEditPopupOpen(false)}
          onSubmit={handleEditCategprytSubmit}
        />
      )}

      {isDeletePopupOpen && (
        <PopupBase
          title="Delete Category"
          actionType="delete"
          category={category}
          onSubmit={deleteCategory}
          onClose={() => setIsDeletePopupOpen(false)}
          popupType={"category"}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default CategoryPreview;
