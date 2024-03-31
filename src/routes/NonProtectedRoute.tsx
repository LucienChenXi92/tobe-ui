import { Outlet } from "react-router-dom";
import { FrontendLayout } from "../components";

export default function NonProtectedRoute() {
  return (
    <FrontendLayout>
      <Outlet />
    </FrontendLayout>
  );
}
