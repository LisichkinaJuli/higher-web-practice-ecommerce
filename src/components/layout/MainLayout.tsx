import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav/BottomNav'
import { Breadcrumbs } from '../../components/ui'

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__container">
        <main className="main-layout__content">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
