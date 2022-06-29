import React from "react";
import { useAuthState } from "../contexts";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { URL } from "../routes";
import { BasicLayout } from "../components";

const useAuth = (): boolean => {
  const context = useAuthState();
  if (context?.user) {
    return true;
  }
  return false;
};

export default function ProtectedRoutes(): React.ReactElement | null {
  const location = useLocation();
  return useAuth() ? (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  ) : (
    <Navigate replace={true} to={URL.SIGN_IN} state={{ from: location }} />
  );
}
