import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "components/routes/PrivateRoute";
import AdminRoute from "components/routes/AdminRoute";

import Secret from "pages/Secret";
import Dashboard from "pages/user/Dashboard";

function App() {
  const Home = React.lazy(() => import("./pages/Home"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Menu = React.lazy(() => import("./components/nav/Menu"));
  const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

  const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
  const AdminCategory = React.lazy(() => import("./pages/admin/AdminCategory"));
  const AdminProduct = React.lazy(() => import("./pages/admin/AdminProduct"));
  const AdminProductUpdate = React.lazy(() =>
    import("./pages/admin/AdminProductUpdate")
  );
  const AdminProducts = React.lazy(() => import("./pages/admin/AdminProducts"));

  const Profile = React.lazy(() => import("./pages/user/Profile.js"));
  const Cart = React.lazy(() => import("./pages/user/Cart.js"));
  const Orders = React.lazy(() => import("./pages/user/Orders.js"));
  const Shop = React.lazy(() => import("./pages/Shop.js"));
  const Search = React.lazy(() => import("./pages/Search.js"));
  const ProductView = React.lazy(() => import("./pages/ProductView.js"));
  const CategoriesList = React.lazy(() => import("./pages/CategoriesList.js"));
  const CategoryView = React.lazy(() => import("./pages/CategoryView.js"));

  return (
    <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
      <BrowserRouter>
        <Menu />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/category/:slug" element={<CategoryView />} />
          <Route path="/search" element={<Search />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="secret" element={<Secret />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/cart" element={<Cart />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            <Route path="admin/product" element={<AdminProduct />} />
            <Route
              path="admin/products/update/:slug"
              element={<AdminProductUpdate />}
            />

            <Route path="admin/products" element={<AdminProducts />} />
          </Route>

          <Route path="/products/:slug" element={<ProductView />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
