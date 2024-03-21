import React from 'react';
import { IoClose } from 'react-icons/io5';
const DeleteModal = ({  closeModal, onDelete}) => {
  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50" onClick={closeModal}>
      <div className="flex justify-center px-4 py-2" >
        <div className="relative w-full mt-5 max-w-2xl rounded-lg shadow-lg bg-white/90 outline-none focus:outline-none" onClick={(e) => (e.stopPropagation())}>
          <div className="p-6">
          <p className='font-bold capitalize '>Are you sure you want to delete this item?</p>
          </div>
          <div className="flex items-center justify-end p-3  gap-4 border-gray-200 rounded-b">
            <button
              type="button"
              className="text-gray-400 transition duration-150 ease-in-out hover:text-blue-400"
              onClick={closeModal}
            >
             Cancel
            </button>
            <button
              type="button"
              className="transition duration-150 ease-in-out bg-red-500 px-3 py-1 text-white font-bold rounded-md hover:bg-red-700"
              onClick={onDelete}
            >
             Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
