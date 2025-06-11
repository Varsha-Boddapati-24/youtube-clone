import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useState, useRef } from 'react';
import { AuthProvider } from './context/AuthContext.jsx'
import Sidebar from './components/SideBar.jsx';
import useClickOutside from './hooks/useClickOutside.js';
import { useLocation } from "react-router-dom"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
  const closeSidebar = () => setIsSidebarOpen(false);
  useClickOutside([sidebarRef, hamburgerRef], () => setIsSidebarOpen(false));
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <AuthProvider>
        <Outlet />  {/* Just show signin/register */}
      </AuthProvider>
    );
  }
  return (
    <>
      <AuthProvider>
        <Header toggleSidebar={toggleSidebar} hamburgerRef={hamburgerRef} onClose={closeSidebar} />
         <div className="flex ">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} sidebarRef={sidebarRef} />
        <main
          className={`flex-1 w-3/4 transition-all duration-300  ${isSidebarOpen ? "ml-5" : "ml-10"}`}
        >
          <Outlet />
        </main>
        </div>
      </AuthProvider>

    </>
  )
}

export default App
