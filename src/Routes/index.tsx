import DashboardHome from "Components/Dashboard/Home"

import { lazy } from "react"
import { Navigate, RouteObject } from "react-router-dom"
import { access } from "Redux/Slices/Access.Slice"

const Dashboard = lazy(() => import("Pages/Dashboard"))

const Login = lazy(() => import("Pages/Login"))
const SignUp = lazy(() => import("Pages/Signup"))
const ForgotPassword = lazy(() => import("Pages/ForgotPassword"))
const ChangePassword = lazy(() => import("Pages/ChangePassword"))
const Settings = lazy(() => import("Pages/Settings"))

const Routes = (access: access | null): RouteObject[] => {
  return [
    {
      path: "*",
      element: access?.loggedIn ? <Navigate to="/dashboard" /> : <Login />,
    },
    {
      path: "signup",
      element: access?.loggedIn ? <Navigate to="/dashboard" /> : <SignUp />,
    },
    {
      path: "forgotPassword",
      element: access?.loggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <ForgotPassword />
      ),
    },
    {
      path: "changePassword",
      element: access?.loggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <ChangePassword />
      ),
    },
    {
      path: "dashboard",
      element: access?.loggedIn ? <Dashboard /> : <Navigate to="/" />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ]
}
export default Routes
