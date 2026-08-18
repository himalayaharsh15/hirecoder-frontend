import { BrowserRouter, useRoutes } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRouteConfig = () => {
  return useRoutes([...PublicRoutes, ...ProtectedRoutes]);
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppRouteConfig />
    </BrowserRouter>
  );
}
