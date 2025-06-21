import { Link } from "react-router-dom";
export default function Sidebar({ isOpen, onClose ,sidebarRef}) {
      // List of sidebar items with optional path and icon
    const sidebarItems = [
        { label: "Home", icon: "fa fa-home", path: "/"  },
        { label: "Trending", icon: "fa fa-fire" },
        { label: "Subscriptions", icon: "fa fa-play-circle" },
        { label: "Library", icon: "fa fa-folder" },
        { label: "History", icon: "fa fa-clock" },
    ];

    return (
           // Sidebar container with dynamic width based on `isOpen`
        <div ref={sidebarRef}
            className={`h-screen bg-white shadow-lg p-2 pt-4  transition-all duration-300 ease-in-out 
      ${isOpen ? "w-45" : "w-11"}
    fixed  md:relative z-10`}
        >
               {/* List of navigation items */}
            <ul className="space-y-4 ">
                {sidebarItems.map(({ label, icon , path }) => (
                    <li
                        key={label}
                        className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded cursor-pointer transition"
                    >
                         {/* If path is provided, wrap item in Link */}
                        {path ? (
              <Link to={path} className="flex items-center gap-4  w-full" onClick={onClose}>
                <i className={`${icon} text-lg`}></i>
                {isOpen && <span className="text-sm font-medium">{label}</span>}
              </Link>
            ): (
                 // If no path, render static item
              <>
                <i className={`${icon} text-lg`}></i>
                {isOpen && <span className="text-sm font-medium">{label}</span>}
              </>
            )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
