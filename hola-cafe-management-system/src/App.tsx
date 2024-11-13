import { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/structure/Layout";
import { Navigate } from "react-router-dom";

/* Pages */
import InventoryPage from "./pages/inventory-page";
import AnalyticsPage from "./pages/analytics-page";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./utils/protectedRoutes";
import PageNotFound from "./pages/404page";

function App(): ReactNode {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path="/" element={<Layout />}>
        <Route index path="" element={<Navigate to="analytics" />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
