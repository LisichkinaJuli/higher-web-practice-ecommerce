import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from '../components/layout';
import { StubPage } from '../pages/_StubPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
   children: [
      { index: true, element: <StubPage title="Главная страница" /> },
      { path: 'catalog', element: <StubPage title="Каталог товаров Quant" /> },
      { path: 'profile', element: <StubPage title="Личный кабинет" /> },
      { path: 'cart', element: <StubPage title="Корзина покупателя" /> },
    ]
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
