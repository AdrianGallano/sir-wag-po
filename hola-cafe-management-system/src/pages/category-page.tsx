import { categoryColumns } from "@/components/columns";
import StockStatus from "@/components/stock/stock-status";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { Category } from "@/models/category";
import dataFetch from "@/services/data-service";
import { Plus, TicketPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import CategoryTable from "@/components/category/category-table";
import AddCategoryForm from "@/components/category/add-category";
import EditCategory from "@/components/category/edit-category";
import DeleteCategory from "@/components/category/delete-category";
import { useNavigate } from "react-router-dom";
import { useStockNotifications } from "@/hooks/useStockNotifications";

const CategoryPage = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const categories = (await dataFetch(
        "api/categories/",
        "GET",
        {},
        token!
      )) as Category[];
      setCategories(categories.reverse());
      console.log("Categories", categories);
    } catch (error) {
      console.error("Failed to fetch stocks", error);
    }
  };

  const handleEdit = (categories: Category) => {
    setSelectedCategory(categories);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (categories: Category) => {
    setSelectedCategory(categories);
    setIsDeletePopupOpen(true);
  };

  const handleMassDelete = async (categories: Category[]) => {
    try {
      for (const category of categories) {
        await dataFetch(`api/categories/${category.id}/`, "DELETE", {}, token!);
      }

      setCategories((prev) =>
        prev.filter((category) => !categories.some((c) => c.id === category.id))
      );
      toast.success("Categories deleted successfully");
    } catch (error) {
      toast.error("Failed to delete categories");
    }
  };

  const columns = categoryColumns(handleEdit, handleDelete, handleMassDelete);

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
    fetchCategories();
  }, []);

  return (
    <main className="h-screen w-full p-3.5">
      <div className="flex justify-between w-full items-center">
        <StockStatus />
        <div className="self-start">
          <Button
            onClick={() => setIsAddProductOpen(true)}
            size={"icon"}
            className="bg-white text-black hover:bg-custom-char hover:text-white border border-gray-300 rounded-full"
          >
            <TicketPlus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <CategoryTable
          columns={columns}
          data={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMassDeletion={handleMassDelete}
        />
      </div>

      {isAddProductOpen && (
        <AddCategoryForm
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onChanges={fetchCategories}
        />
      )}

      {isEditPopupOpen && (
        <EditCategory
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          category={selectedCategory!}
          onChanges={fetchCategories}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteCategory
          isOpen={isDeletePopupOpen}
          category={selectedCategory!}
          onClose={() => setIsDeletePopupOpen(false)}
          onUpdate={fetchCategories}
        />
      )}

      <Toaster position="top-right" />
    </main>
  );
};

export default CategoryPage;
