import NonAuthGuard from "../guards/NonAuthGuard";
import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));

export const authRoutes = [
  {
    path: "/",
    element: (
      <NonAuthGuard redirectTo={"/"}>
        <Outlet />
      </NonAuthGuard>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];
