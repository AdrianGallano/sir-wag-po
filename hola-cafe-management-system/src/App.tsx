import { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/structure/Layout";
import { Navigate } from "react-router-dom";

/* Pages */
import InventoryPage from "./pages/inventory-page";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./utils/protectedRoutes";
import PageNotFound from "./pages/404page";
import PosPage from "./pages/pos-page";
import SupplierPage from "./pages/supplier-page";
import ProductPage from "./pages/product-page";
import TransactionPage from "./pages/transaction-page";
import CategoryPage from "./pages/category-page";
import StockPosPage from "./pages/stock-pos-page";
import DashboardPage from "./pages/dashboard-page";
import StockTransactionPage from "./pages/stock-transaction-page";

function App(): ReactNode {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index path="" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="supplier" element={<SupplierPage />} />
          <Route path="pos" element={<PosPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="stock-transaction" element={<StockTransactionPage />} />
          <Route path="transaction" element={<TransactionPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="stockpos" element={<StockPosPage />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
