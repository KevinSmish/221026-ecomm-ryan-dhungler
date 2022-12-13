// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { useAuth } from "context/auth";
import Loading from "./Loading";

const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(`/users/admin-check`);
      const checked = data?.ok === true;
      setEnabled(checked);
    };

    if (auth?.token) adminCheck();
  }, [auth?.token]);

  return enabled ? <Outlet /> : <Loading path="" />;
};

export default AdminRoute;
