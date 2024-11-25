import React, { useEffect, useState } from "react";
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
import { Category } from "@/models/category";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { EyeIcon } from "lucide-react";

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (category: Category) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (isOpen) fetchCategories();
  }, [isOpen]);

  // Fetch categories
  const fetchCategories = async () => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await dataFetch("api/categories/", "GET", {}, token);
      console.log("Categories fetched:", response);
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle edit click
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
  };

  // Handle delete click
  const handleDeleteClick = async (category: Category) => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      // Pass only the category id for deletion
      await dataFetch(`api/categories/${category.id}/`, "DELETE", {}, token);
      console.log("Category deleted:", category);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Save edited category
  const handleSaveEdit = async () => {
    if (!selectedCategory || !token) return;

    const editedCategoryPayload = {
      name: selectedCategory.name,
      description: selectedCategory.description,
    };

    try {
      // Send only the name and description in the payload
      await dataFetch(
        `api/categories/${selectedCategory.id}/`,
        "PUT",
        editedCategoryPayload,
        token
      );
      console.log("Category updated:", selectedCategory);
      setIsEditMode(false);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Category Manager</DialogTitle>
          <DialogDescription>Manage your categories here</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center">
              {isEditMode && selectedCategory?.id === category.id ? (
                <div>
                  <input
                    className="border border-gray-300 rounded-md px-2 py-1"
                    value={selectedCategory.name}
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        name: e.target.value,
                      })
                    }
                  />
                  {/* <textarea
                    className="border border-gray-300 rounded-md mt-2 px-2 py-1"
                    value={selectedCategory.description}
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        description: e.target.value,
                      })
                    }
                  /> */}
                </div>
              ) : (
                <div>
                  <span>{category.name}</span>
                  {/* <p>{category.description}</p> */}
                </div>
              )}
              <div className="flex items-center space-x-2">
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(category)}
                >
                  <Pen size={16} />
                </Button> */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(category)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {isEditMode && (
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryManager;
