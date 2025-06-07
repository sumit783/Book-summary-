import { Outlet } from 'react-router-dom';
import { NavBar } from './layout/NavBar';

function Layout() {
  return (
    <div className="min-h-screen">
      <header className="backdrop-blur-sm border-b border-neutral-800">
       <NavBar />
      </header>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;