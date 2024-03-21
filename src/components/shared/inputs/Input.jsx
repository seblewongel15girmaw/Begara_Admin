import React from "react";

const FormInput = ({ name, placeholder, value, label, type, error, onChange }) => {
  return (
    <div>
      <label
        htmlFor={name} 
        className="block capitalize text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={type}  
        name={name}  
        value={value}  
        placeholder={placeholder}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-primary/20 placeholder:text-sm"
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
