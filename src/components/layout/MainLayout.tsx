import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { BottomNav } from '../BottomNav/BottomNav';
export function MainLayout() {
  return (
    <div className="app-layout flex flex-col min-h-screen">
      <Header />
      <main className="app-layout__main grow py-6 max-md:py-3 max-md:pb-19">
        <div className="app-layout__container w-full max-w-container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}