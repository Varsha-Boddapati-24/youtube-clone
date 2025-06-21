import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CreateChannelModal from "./createChannelModal.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import useClickOutside from "../hooks/useClickOutside";

export default function Header({ toggleSidebar, hamburgerRef, onClose }) {
    // Get user & signout from AuthContext
  const { user, signout } = useAuth();
  console.log("user", user) 
  const [query, setQuery] = useState("");  // Search query state
  const [showSearch, setShowSearch] = useState(false);  // Toggle for mobile search
  const [showMenu, setShowMenu] = useState(false);  // Toggle for user menu dropdow
  const [showChannelModal, setShowChannelModal] = useState(false); // Toggle for channel creation modal
  const navigate = useNavigate()
  const location = useLocation();
  const menuRef = useRef(null); // Ref to detect outside click for user menu

    // Handle search button click
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

   // On page load, set query value from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get("q") || "";
    setQuery(urlQuery);
  }, [location.search]);

// Allow "Enter" key to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  // Close dropdown menu when clicked outside
  useClickOutside([menuRef], () => setShowMenu(false), showMenu);
  return (
    <>
      {/* Header container */}
      <header className="flex items-center justify-between bg-white   px-4 py-2 sticky top-0  z-50">
         {/* ----------------- MOBILE SEARCH BAR (visible only on small screens) ---------------- */}
        {showSearch ? (
          <div className="flex items-center w-full sm:hidden py-2 gap-2">
            <button onClick={() => setShowSearch(false)} className="text-xl text-gray-700 mr-2">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
             {/* Mobile search input */}
            <input type="text" placeholder="Search" value={query} onKeyDown={handleKeyDown} onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
              {/* Mobile search icon button */}
            <button className=" py-2 ml-2 hover:bg-gray-100 rounded-full" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass text-lg text-gray-700"></i>
            </button>
          </div>

        ) : (
         // ----------------- REGULAR HEADER CONTENT (desktop & mobile default) ----------------
          <div className="flex items-center justify-between w-full">
            {/* Left: menu + logo */}
            <div className="flex items-center gap-4 ">
              <button ref={hamburgerRef} onClick={toggleSidebar} className="cursor-pointer">
                <i className="fa-solid fa-bars text-xl text-gray-700"></i>
              </button>
              <img src="/youtube.jpg" alt="YouTube Logo" className="w-28 h-auto object-contain " />
            </div>

            {/* Middle: Search bar (only visible on desktop) */}
            <div className=" hidden sm:flex items-center flex-1 mx-4 max-w-xl  focus-within:border-black">
              <input type="text" placeholder="Search" value={query} onKeyDown={handleKeyDown} onChange={(e) => setQuery(e.target.value)} className="w-full px-4 py-2 border  border-gray-300  rounded-l-full  focus:outline-none focus:border-black" />
              <button onClick={handleSearch} className="h-full px-4 py-2 border  border-gray-300  rounded-r-full  hover:bg-gray-100">
                <i className="fa-solid fa-magnifying-glass text-lg  text-gray-700"></i>
              </button>

            </div>

            {/* Right side: Mobile search icon + Auth buttons */}
            <div className="flex items-center gap-2 ">
                {/* Mobile search button (toggles search bar on small screen) */}
              <button onClick={() => setShowSearch(true)} className="sm:hidden p-2 text-gray-700">
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
              </button>
              {/* Check if user is signed in */}
              {user ? (
                // ---------------- USER MENU (Signed In) -----------------
                <div ref={menuRef} className=" relative flex items-center gap-2">
                  {/* Avatar Image */}
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "User")}&background=random`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    onClick={() => setShowMenu((prev) => !prev)}
                  />
                  <span className="text-gray-700 font-medium">{user.username || "User"}</span>
 {/* Dropdown Menu */}

                  {showMenu && (
                    <div className="absolute right-0 mt-60 w-55 md:w-72 lg:w-70 bg-white rounded-xl shadow-lg z-50 p-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3 mb-3 py-4 border-b-1">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "User")}&background=random`}
                          alt="User Avatar"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800 text-sm sm:text-base">{user.username}</span>
                          <span className="text-sm text-gray-500 break-all">{user.email}</span>
                        </div>
                      </div>

                       {/* Create/View Channel logic */}
                      {!user.channel ? (
                        <button
                          onClick={() => {
                            setShowChannelModal(true);
                            setShowMenu(false);
                          }}

                          className=" flex items-center gap-2 w-full text-left text-blue-600 hover:bg-blue-50 p-2 rounded text-sm sm:text-base"
                        >
                          <i className="fa-solid fa-plus"></i> Create Channel
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            navigate(`/channel/${user.channel}`);
                            setShowMenu(false);
                          }}
                          className=" flex items-center gap-2 w-full text-left text-green-600 hover:bg-green-50 p-2 rounded text-sm sm:text-base cursor-pointer"
                        >
                          <i className="fa-solid fa-eye"></i> View Channel
                        </button>
                      )}
             {/* Sign Out Button */}
                      <button
                        onClick={async () => {
                          await signout();
                          setShowMenu(false);
                          navigate("/");
                        }}
                        className="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 p-2 mt-2 rounded text-sm sm:text-base cursor-pointer" >
                        <i className="fa-solid fa-arrow-right-to-bracket"> </i> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )

                : (
                   // ---------------- SIGN IN BUTTON (Not Signed In) -----------------
                  <button
                    onClick={(e) => {
                      console.log("called")
                      onClose();
                      navigate(`/signin?redirect=${encodeURIComponent(location.pathname)}`)
                    }}
                    className="flex items-center gap-2 px-4 py-1 text-md font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 cursor-pointer"
                  >
                    <i className="fa-solid fa-circle-user text-xl"></i>
                    Sign In
                  </button>
                )}

            </div>
          </div>

        )
        }


      </header>
      {/* ---------------- CHANNEL MODAL ---------------- */}
      {showChannelModal && (
        <CreateChannelModal
          onClose={() => setShowChannelModal(false)}
        />
      )}
    </>
  )
}
