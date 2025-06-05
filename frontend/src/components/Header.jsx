import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const navigate=useNavigate()
  return (
    <>
      <header className="flex items-center justify-between bg-white   px-4 py-2 sticky top-0 ">
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
              <button>
                <i className="fa-solid fa-bars text-xl text-gray-700"></i>
              </button>
              <img src="/youtube.jpg" alt="YouTube Logo" className="w-28 h-auto object-contain "/>
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
              <button onClick={() => navigate("/login")} className="flex items-center gap-2 px-4 py-1 text-md font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50">
                <i className="fa-solid fa-circle-user text-xl"></i>
                Sign In
              </button>
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
    </>
  )
}
