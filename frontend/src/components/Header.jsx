import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateChannelModal from "./CreateChannelModal.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import useClickOutside from "../hooks/useClickOutside";

export default function Header({ toggleSidebar, hamburgerRef, onClose }) {
  const { user, signout } = useAuth();
  console.log("user", user)

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const navigate = useNavigate()
  const menuRef = useRef(null);

  useClickOutside([menuRef], () => setShowMenu(false), showMenu);
  return (
    <>
      <header className="flex items-center justify-between bg-white   px-4 py-2 sticky top-0  z-50">
        {showSearch ? (
          <div className="flex items-center w-full sm:hidden py-2 gap-2">
            <button onClick={() => setShowSearch(false)} className="text-xl text-gray-700 mr-2">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <input type="text" placeholder="Search"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
            <button className=" py-2 ml-2 hover:bg-gray-100 rounded-full">
              <i className="fa-solid fa-magnifying-glass text-lg text-gray-700"></i>
            </button>
          </div>

        ) : (
          // Regular header content (menu, logo, search icon, sign-in)
          <div className="flex items-center justify-between w-full">
            {/* Left: menu + logo */}
            <div className="flex items-center gap-4 ">
              <button ref={hamburgerRef} onClick={toggleSidebar}>
                <i className="fa-solid fa-bars text-xl text-gray-700"></i>
              </button>
              <img src="/youtube.jpg" alt="YouTube Logo" className="w-28 h-auto object-contain " />
            </div>

            {/* Middle: desktop search bar */}
            <div className=" hidden sm:flex items-center flex-1 mx-4 max-w-xl  focus-within:border-black">
              <input type="text" placeholder="Search" className="w-full px-4 py-2 border  border-gray-300  rounded-l-full  focus:outline-none focus:border-black" />
              <button className="h-full px-4 py-2 border  border-gray-300  rounded-r-full  hover:bg-gray-100">
                <i className="fa-solid fa-magnifying-glass text-lg  text-gray-700"></i>
              </button>

            </div>

            {/* Right: mobile search icon + sign-in */}
            <div className="flex items-center gap-2 ">
              <button onClick={() => setShowSearch(true)} className="sm:hidden p-2 text-gray-700">
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
              </button>
              {/* <button onClick={() => navigate("/signin")} className="flex items-center gap-2 px-4 py-1 text-md font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50">
                <i className="fa-solid fa-circle-user text-xl"></i>
                Sign In
              </button> */}
              {user ? (

                <div ref={menuRef} className=" relative flex items-center gap-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "User")}&background=random`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                    onClick={() => setShowMenu((prev) => !prev)}
                  />
                  <span className="text-gray-700 font-medium">{user.username || "User"}</span>


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

                      {/* Conditional buttons */}
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
                          className=" flex items-center gap-2 w-full text-left text-green-600 hover:bg-green-50 p-2 rounded text-sm sm:text-base"
                        >
                          <i class="fa-solid fa-eye"></i> View Channel
                        </button>
                      )}

                      <button
                        onClick={async () => {
                          await signout();
                          setShowMenu(false);
                          // navigate("/signin"); 
                        }}
                        className="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 p-2 mt-2 rounded text-sm sm:text-base" >
                        <i className="fa-solid fa-arrow-right-to-bracket"> </i> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )

                : (
                  <button
                    onClick={(e) => {
                      console.log("called")
                      onClose();
                      navigate("signin")
                    }}
                    className="flex items-center gap-2 px-4 py-1 text-md font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                  >
                    <i className="fa-solid fa-circle-user text-xl"></i>
                    Sign In
                  </button>
                )}

            </div>
          </div>

        )
        }


        {/* <div className=" hidden sm:flex items-center flex-1 mx-4 max-w-xl  focus-within:border-black">
          <input type="text" placeholder="Search" className="w-full px-4 py-2 border  border-gray-300  rounded-l-full  focus:outline-none focus:border-black" />
          <button className="h-full px-4 py-2 border  border-gray-300  rounded-r-full  hover:bg-gray-100">
            <i className="fa-solid fa-magnifying-glass text-lg  text-gray-700"></i>
          </button>

        </div>

        <div>
          <button className="flex items-center gap-2 px-4 py-1 text-md font-semibold  text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50">
            <i className="fa-solid fa-circle-user text-xl "></i>
            Sign In
          </button>
        </div> */}
      </header>
       {/* Place the modal rendering right here, outside the header but inside the component */}
      {showChannelModal && (
        <CreateChannelModal
          onClose={() => setShowChannelModal(false)}
        />
      )}
    </>
  )
}
