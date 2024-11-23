import React from 'react';

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  className?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  className = '',
  required = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block mb-1 text-gray-700 font-medium">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
