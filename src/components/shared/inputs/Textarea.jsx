import React from "react";

export default function TextArea({
  name,
  placeholder,
  value,
  label,
  error,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block capitalize text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full capitalize py-2 px-3 text-gray-700 leading-tight  focus:outline-primary/20 placeholder:text-sm"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        cols="30"
        rows="3"
      ></textarea>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
