import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "pages/admin/Dashboard";
import PrivateRoute from "components/routes/PrivateRoute";

function App() {
  const Home = React.lazy(() => import("./pages/Home"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Menu = React.lazy(() => import("./components/nav/Menu"));

  return (
    <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
      <BrowserRouter>
        <Menu />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
