import React from 'react';

interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder = '',
  className = '',
  label,
  required = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block mb-1 text-gray-700 font-medium">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default Input;
