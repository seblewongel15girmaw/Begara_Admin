import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { navData } from "../../utils/navData";
import { getIcon } from "../../utils/iconFunction";

import Image from "../../assets/logo3.png";

const Sidebar = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [path, setPath] = useState(null);
  const location = useLocation();

  const toggleCategory = (index) => {
    if (openCategory === index) {
      setOpenCategory(null);
    } else {
      setOpenCategory(index);
    }
  };

  useEffect(() => {
    // Extract the path from the location
    const path = location.pathname;
    // console.log(path);
    setPath(path);
  }, [location.pathname]);

  return (
    <div className="bg-sideBar px-3 overflow-y-auto text-white w-60 h-full md:fixed shadow-md">
      <div className="flex justify-center p-4">
        <img src={Image} alt="Logo" className="w-70 h-20" />
        {/* <h1 className="font-extrabold text-amber-800 text-2xl">Logo</h1> */}
      </div>
      <ul className="space-y-4 mt-7">
        {navData.map((item, index) => (
          <li className="mb-4" key={index}>
            {item.subCategories.length > 0 ? (
              <span
                className={`cursor-pointer `}
                onClick={() => toggleCategory(index)}
              >
                <div className="p-2 flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-2">{getIcon(item.name)}</span>
                    {item.name}
                  </span>
                  <FiChevronDown
                    className={`${
                      openCategory === index ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </span>
            ) : (
              <div className={`p-2 ${path === item.link ? "bg-gray-700" : ""}`}>
                <Link
                  to={item.link}
                  className={`cursor-pointer`}
                  onClick={() => toggleCategory(index)}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{getIcon(item.name)}</span>
                    {item.name}
                  </span>
                </Link>
              </div>
            )}
            {item.subCategories.length > 0 && (
              <ul
                className={`ml-4 ${
                  openCategory === index ? "block" : "hidden"
                }`}
              >
                {item.subCategories.map((subCategory, subIndex) => (
                  <li
                    className={`pl-4 mt-2 py-2 ${
                      path === subCategory.link ? "bg-gray-700" : ""
                    }`}
                    key={subIndex}
                  >
                    <Link
                      to={subCategory.link}
                      className={`cursor-pointer flex items-center `}
                    >
                      <span className="mr-2">{getIcon(subCategory.name)}</span>
                      {subCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
