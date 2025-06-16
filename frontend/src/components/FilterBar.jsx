import { useState, useRef } from "react";
// List of filter categories
const filters = [
  "All", "Music", "Gaming", "News", "Sports", "Movies",
  "Education", "Coding", "Comedy", "Technology", "Health", "Food"
];

export default function FilterBar({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("All");// Active selected filter state
  const scrollRef = useRef(null); // Ref to scrollable container

   // Handle filter click
  const handleClick = (filter) => {
    setActiveFilter(filter);  // Update selected filter in state
    onFilterChange(filter);    // Pass selected filter to parent component via callback
  };
// Scroll left by 300px
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
 // Scroll right by 300px
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="sticky top-0  bg-white  py-3">

       {/* Responsive container that centers content */}
      <div className="relative w-full max-w-[640px] md:max-w-[768px] lg:max-w-[950px] xl:max-w-[1200px] px-4 flex items-center">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="px-2 py-0.5 text-xl z-10 bg-white border rounded-full cursor-pointer hover:bg-gray-200"
        >
        <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Scrollable container */}
        <div className="overflow-hidden flex-1 mx-3">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
  {/* Render all filters as buttons */}
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleClick(filter)}
                className={`px-4 py-1 rounded-xl ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="px-2 py-0.5 text-xl z-10 bg-white border rounded-full cursor-pointer hover:bg-gray-200"
        >
        <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
