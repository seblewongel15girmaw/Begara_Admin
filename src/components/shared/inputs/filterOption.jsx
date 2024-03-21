import React from "react";

const FilterInput = ({ options, selectedOption, onChange, label }) => {
  return (
    <div className="flex gap-1 items-center">
      <p className="text-gray-700 capitalize font-bold">{label}</p>
      <select
        className="block w-full bg-white border border-gray-300 p-2 rounded-md  focus:border-primary/50"
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">...</option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterInput;
