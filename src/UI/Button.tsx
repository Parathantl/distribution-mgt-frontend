import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}) => {
  const baseStyles =
    'px-4 py-2 rounded text-white font-medium focus:outline-none focus:ring';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
    secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
