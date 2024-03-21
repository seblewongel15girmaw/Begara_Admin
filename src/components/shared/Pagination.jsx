import React from "react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  return (
    <ul className="pagination flex gap-2 flex-wrap ">
      {Array.from({ length: pageNumbers }).map((_, index) => (
        <li key={index}>
          <button
            className={`bg-primary hover:bg-secondary text-white font-bold py-1 px-3 rounded ${
              index + 1 === currentPage ? "bg-secondary" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
