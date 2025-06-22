import { Outlet } from 'react-router-dom';
import { NavBar } from './layout/NavBar';
import Footer from './layout/Footer';

function Layout() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-background via-[#f3f4f6]/60 to-[#e0e7ff]/60 dark:from-[#18181b] dark:via-[#23272f]/70 dark:to-[#1e293b]/70">
      {/* Decorative blurred background shapes */}
      <div className="pointer-events-none select-none absolute -top-32 -left-32 w-96 h-96 bg-purple-300/30 dark:bg-purple-800/20 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none select-none absolute top-1/2 right-0 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-2xl z-0" />
      <div className="pointer-events-none select-none absolute bottom-0 left-1/3 w-72 h-72 bg-pink-200/30 dark:bg-pink-900/20 rounded-full blur-2xl z-0" />
      <header className="backdrop-blur-sm border-b border-neutral-800 relative z-10">
       <NavBar />
      </header>
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;