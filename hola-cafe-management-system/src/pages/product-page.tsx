import { productColumns } from "@/components/columns";
import AddProductForm from "@/components/products/add-product";
import DeleteProduct from "@/components/products/delete-product";
import EditProduct from "@/components/products/edit-product";
import ProductTable from "@/components/products/product-table";
import StockStatus from "@/components/stock/stock-status";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { Category } from "@/models/category";
import Product from "@/models/product";
import dataFetch from "@/services/data-service";
import { DiamondPlusIcon, PackagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";
import { useStockNotifications } from "@/hooks/useStockNotifications";
import { useStock } from "@/context/stockContext";

const ProductPage = () => {
  const { token } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const Navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const products = (await dataFetch(
        "api/image/category/product/",
        "GET",
        {},
        token!
      )) as Product[];
      setProducts(products.reverse());
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const exportProducts = async () => {
    try {
      const response = await dataFetch(
        "api/excel/product",
        "GET",
        {},
        token!,
        "blob"
      );

      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      window.open(url);
    } catch (error) {
      console.error("Failed to fetch Excel file", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = (await dataFetch(
        "api/categories/",
        "GET",
        {},
        token!
      )) as Category[];
      setCategories(categories);
    } catch (error) {
      console.error("Failed to fetch stocks", error);
    }
  };

  const handleMassDelete = async (products: Product[]) => {
    try {
      for (const product of products) {
        await dataFetch(`api/products/${product.id}/`, "DELETE", {}, token!);
      }

      setProducts((prev) =>
        prev.filter((product) => !products.some((c) => c.id === product.id))
      );
      toast.success("Products deleted successfully");
    } catch (error) {
      toast.error("Failed to delete products");
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeletePopupOpen(true);
  };

  const columns = productColumns(handleEdit, handleDelete, handleMassDelete);

  const onUpdate = () => {
    fetchProducts();
  };

  useEffect(() => {
    if (!token) {
      Navigate("login");
    }
    fetchCategories();
    fetchProducts();
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
            <DiamondPlusIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <ProductTable
          columns={columns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={exportProducts}
          onMassDeletion={handleMassDelete}
        />
      </div>
      {isAddProductOpen && (
        <AddProductForm
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onUpdate={onUpdate}
          categories={categories}
        />
      )}

      {isEditPopupOpen && (
        <EditProduct
          isOpen={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          product={selectedProduct!}
          onChanges={onUpdate}
        />
      )}

      {isDeletePopupOpen && (
        <DeleteProduct
          isOpen={isDeletePopupOpen}
          product={selectedProduct!}
          onClose={() => setIsDeletePopupOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </main>
  );
};

export default ProductPage;
