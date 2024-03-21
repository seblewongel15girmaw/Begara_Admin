import React from "react";

const OptionInput = ({ label, options, value, onChange, name, title, error }) => {
  return (
    <div className="">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        value={value}
        name={name}
        onChange={onChange}
        className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary/50"
      >
        <option value="" className="text-gray-400">...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {getTitleValue(option, title)}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Helper function to get the value based on the title
const getTitleValue = (option, title) => {
  const titleParts = title.split(".");
  let value = option;

  for (const part of titleParts) {
    if (value && typeof value === "object" && part in value) {
      value = value[part];
    } else {
      value = null;
      break;
    }
  }

  return value !== null ? value : option[title];
};

export default OptionInput;
