import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useState, useRef } from 'react';
import { AuthProvider } from './context/AuthContext.jsx'
import Sidebar from './components/SideBar.jsx';
import useClickOutside from './hooks/useClickOutside.js';
import { useLocation } from "react-router-dom"

function App() {
    // State to toggle sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   // Refs for detecting outside clicks
  const hamburgerRef = useRef(null);
  const sidebarRef = useRef(null);
   // Toggle sidebar open/close
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
    // Close sidebar
  const closeSidebar = () => setIsSidebarOpen(false);
    // Close sidebar if user clicks outside both sidebar and hamburger menu
  useClickOutside([sidebarRef, hamburgerRef], () => setIsSidebarOpen(false));
  // Get current route path
  const location = useLocation();
   // Check if the current route is for authentication (login/register)
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/register";
// Render only the outlet inside AuthProvider for auth pages
  if (isAuthPage) {
    return (
      <AuthProvider>
        <Outlet />  {/* Just show signin/register */}
      </AuthProvider>
    );
  }
    // Render full layout for non-auth pages
  return (
    <>
      <AuthProvider>
         {/* Top Navigation Bar */}
        <Header toggleSidebar={toggleSidebar} hamburgerRef={hamburgerRef} onClose={closeSidebar} />
         <div className="flex ">
            {/* Sidebar + Main Content */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} sidebarRef={sidebarRef} />
        <main
          className={`flex-1 w-3/4 transition-all duration-300  ${isSidebarOpen ? "ml-5" : "ml-10"}`}
        >
          <Outlet /> {/* Renders nested route content */}
        </main>
        </div>
      </AuthProvider>

    </>
  )
}

export default App
