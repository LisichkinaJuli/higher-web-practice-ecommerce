import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../components/layout";
import { StubPage } from "../pages/_StubPage";
import { CatalogPage } from "../pages/CatalogPage/CatalogPage";
import { ProductPage } from "../pages/CatalogPage/components/ProductCardDetail";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { ProfileEditPage } from "../pages/ProfilePage/ProfileEditPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { CartPage } from "../pages/CartPage/CartPage";
import { SuccessOrderPage } from "../pages/SuccessOrderPage/SuccessOrderPage";
import { CheckoutPage } from "../pages/CheckoutPage/CheckoutPage";
import { OrdersHistoryPage } from "../pages/OrdersHistoryPage/OrdersHistoryPage";
import { ProtectedRoute } from "./ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/catalog" replace />,
      },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "catalog/:id",
        element: <ProductPage />,
      },
      {
        path: "home",
        element: <StubPage title="Главная страница" />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: "edit",
            element: <ProfileEditPage />,
          },
          {
            path: "orders",
            element: <OrdersHistoryPage />,
          },
        ],
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "checkout/success",
        element: <SuccessOrderPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <Navigate to="/catalog" replace />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
export function AppRouter() {
  return <RouterProvider router={router} />;
}