import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
  
    return (
      <nav className="flex my-1">
        <ol className="flex list-none items-center p-0 font-sans">
          <li className="flex text-gray-400 items-center gap-1 text-center">
            <Link to="/" className="text-gray-400">Home</Link>
            <FiChevronRight size={10} />
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <li key={name} className="flex items-center">
                <span className="text-gray-500">{name}</span>
              </li>
            ) : (
              <li key={name} className="flex items-center">
                <Link to={routeTo} className="text-blue-600">{name}</Link>
                <FiChevronRight size={10} />
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };
export default Breadcrumb;
