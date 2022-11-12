// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import axios from "../../axios";
import { useAuth } from "context/auth";
import Loading from "./Loading";

const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();
  const [enabled, setEnabled] = useState(false);

  console.log(auth);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/users/auth-check`);
      const checked = data?.ok === true;
      setEnabled(checked);
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return enabled ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
