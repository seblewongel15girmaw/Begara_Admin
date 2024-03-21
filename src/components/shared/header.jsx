import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function Header({ toggleSidebar}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between px-3 z-50 bg-white text-textColor shadow py-2 md:px-6">
      <button className="block" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="relative ml-3">
        <div
          className="flex items-center gap-2 h-10 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {/* Display user information */}
          <div className="cursor-pointer">trt</div>
          <FiChevronDown
            className={`${open ? "transform rotate-180" : ""}`}
            size={20}
          />
        </div>
        {/* Render logout dropdown if 'open' is true */}
        {open && (
          <div className="absolute top-full right-0 z-10 mt-2 font-bold text-primary bg-white px-2 py-2 rounded-md shadow-md border border-gray-300">
            <div
              className="cursor-pointer py-1 px-1 hover:text-lg"
              // onClick={logout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

