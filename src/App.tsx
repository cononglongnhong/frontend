import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

import { useAppContext } from "./contexts/AppContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeAdmin from "./pages/HomeAdmin";
import AdminCategoriesPage from "./pages/admin/category/AdminCategoriesPage";
import AdminProductsPage from "./pages/admin/product/AdminProductsPage";
import AdminVariantsPage from "./pages/admin/variant/AdminVariantsPage";
import AdminOrdersPage from "./pages/admin/order/AdminOrdersPage";
import AdminCustomersPage from "./pages/admin/customer/AdminCustomersPage";
import AdminReviewsPage from "./pages/admin/review/AdminReviewsPage";
import ProductDetail from "./pages/user/product/ProductDetail";

const App = () => {
  const { isLoggedIn, userRole, isAuthLoading } = useAppContext();

  // CHẶN RENDER TRƯỚC KHI XÁC THỰC
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Đang tải thông tin đăng nhập...
      </div>
    );
  }

  // "/" — tự động phân quyền
  const renderHome = () => {
    if (!isLoggedIn) {
      return (
        <Layout>
          <Home />
        </Layout>
      );
    }

    if (userRole === "admin") {
      return (
        <AdminLayout title="Dashboard">
          <HomeAdmin />
        </AdminLayout>
      );
    }

    return (
      <Layout>
        <Home />
      </Layout>
    );
  };

  // Route chỉ admin được xem
  const requireAdmin = (page: JSX.Element) => {
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (userRole !== "admin") return <Navigate to="/" />;
    return page;
  };

  return (
    <Router>
      <Routes>
        {/* "/" — tự động theo role */}
        <Route path="/" element={renderHome()} />

        {/* Public */}
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/login" element={<Layout><SignIn /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />

        {/* Admin */}
        {/* ================= ADMIN MODULE ROUTES ================= */}

        {/* Danh mục */}
        <Route
          path="/admin/categories"
          element={requireAdmin(
            <AdminLayout title="Quản lý danh mục">
              <AdminCategoriesPage />
            </AdminLayout>
          )}
        />

        {/* Sản phẩm */}
        <Route
          path="/admin/products"
          element={requireAdmin(
            <AdminLayout title="Quản lý sản phẩm">
              <AdminProductsPage />
            </AdminLayout>
          )}
        />

        {/* Biến thể */}
        <Route
          path="/admin/variants"
          element={requireAdmin(
            <AdminLayout title="Quản lý biến thể">
              <AdminVariantsPage />
            </AdminLayout>
          )}
        />

        {/* Đơn hàng */}
        <Route
          path="/admin/orders"
          element={requireAdmin(
            <AdminLayout title="Quản lý đơn hàng">
              <AdminOrdersPage />
            </AdminLayout>
          )}
        />

        {/* Khách hàng */}
        <Route
          path="/admin/customers"
          element={requireAdmin(
            <AdminLayout title="Quản lý khách hàng">
              <AdminCustomersPage />
            </AdminLayout>
          )}
        />

        {/* Đánh giá */}
        <Route
          path="/admin/reviews"
          element={requireAdmin(
            <AdminLayout title="Quản lý đánh giá">
              <AdminReviewsPage />
            </AdminLayout>
          )}
        />


        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
