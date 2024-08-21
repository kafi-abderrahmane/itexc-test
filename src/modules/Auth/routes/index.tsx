import NonAuthGuard from "../guards/NonAuthGuard";
import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"));

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
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
];
