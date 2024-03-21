import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({ onChange }) {
  return (
    <div className="flex items-center justify-end py-1 border px-2 rounded ">
      <input
        className="bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search..."
        aria-label="Search"
        onChange={onChange}
      />
      <FaSearch className="text-primary cursor-pointer" />
    </div>
  );
}
