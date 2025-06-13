import { useState, useRef } from "react";

const filters = [
  "All", "Music", "Gaming", "News", "Sports", "Movies",
  "Education", "Coding", "Comedy", "Technology", "Health", "Food"
];

export default function FilterBar({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const scrollRef = useRef(null);

  const handleClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="sticky top-0  bg-white  py-3">

      {/* Fixed-width wrapper that sticks to left and is responsive */}
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
       {/* <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style> */}

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
