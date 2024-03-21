import React from "react";
import {
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import {
  IoIosArrowUp,
  IoIosArrowDown
} from "react-icons/io";

const Table = ({
  data,
  columns,
  onEdit,
  onDelete,
  jsonColumns,
  handleDetailModal = null,
  sortColumn = null,
  sortDirection = null,
  onSort = null,
}) => {
  if (data.length === 0) {
    return (
      <p className="flex justify-center items-center min-h-[40vh] capitalize text-gray-500">
        No data found
      </p>
    );
  }

  return (
    <div className="overflow-x-auto min-h-[40vh] max-h-[80vh] bg-white shadow-sm pt-0 p-5 rounded-md border-none">
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-center">
          <thead className="capitalize text-center sticky top-0 z-1 bg-slate-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="py-2 px-4 border-b text-black cursor-pointer"
                  onClick={() => onSort(column)}
                >
                  <div className="flex items-center justify-center">
                    {column}
                    {sortColumn === column && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                {jsonColumns.map((column) => {
                  const arr = column.split(".");
                  const firstElement = arr.shift();

                  // Check if the nested property exists before accessing it
                  const columnValue =
                    item[firstElement] &&
                    arr.reduce((acc, curr) => acc?.[curr], item[firstElement]);

                  return (
                    <td
                      key={column}
                      className="py-2 px-4 border-b text-textColor cursor-pointer "
                      onClick={() => handleDetailModal(item)}
                    >
                      <p>{columnValue !== null ? columnValue : "-"}</p>
                    </td>
                  );
                })}
                <td className="py-2 flex flex-wrap items-center justify-center border-b">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 font-bold py-2 px-3 rounded mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="text-red-500 font-bold py-2 px-3 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
