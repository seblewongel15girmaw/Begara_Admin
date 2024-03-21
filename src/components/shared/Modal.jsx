import React from 'react';
import { IoClose } from 'react-icons/io5';
const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-50" onClick={closeModal}>
      <div className="flex items-center justify-center min-h-screen px-4 py-2" >
        <div className="relative w-full max-w-2xl rounded-lg shadow-lg bg-white/90 outline-none focus:outline-none" onClick={(e) => (e.stopPropagation())}>
          <div className="px-6">
            {children}
          </div>
          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b absolute top-0 right-0">
            <button
              type="button"
              className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-900"
              onClick={closeModal}
            >
              <IoClose size={25}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
