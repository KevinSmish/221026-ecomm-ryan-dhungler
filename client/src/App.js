import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const Home = React.lazy(() => import("./pages/Home"));
  const Login = React.lazy(() => import("./pages/Login"));
  const Register = React.lazy(() => import("./pages/Register"));
  const Menu = React.lazy(() => import("./components/nav/Menu"));

  return (
    <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
