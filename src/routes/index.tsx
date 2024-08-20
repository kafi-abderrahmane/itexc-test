import { Navigate, useRoutes } from "react-router-dom";

import { authRoutes } from "../modules/Auth/routes";

import { dashboardRoutes } from "../modules/Dashboard/routes";

export default function Router() {
  return useRoutes([
    // Auth routes
    ...authRoutes,
    // Dashboard routes
    ...dashboardRoutes,

    // No match 404
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
}
