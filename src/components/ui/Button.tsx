"use client";
import React from "react";

interface IButtonProps {
  label: string;
  onClick: VoidFunction;
  disabled?: boolean;
  className?: string;
}

const Button = ({ label, onClick, disabled, className }: IButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-black disabled:cursor-not-allowed disabled:opacity-50 text-white py-2 px-6 rounded-md flex items-center justify-center shadow-md hover:bg-gray-800 transition duration-300`}
    >
      {label}
      <span className="ml-2">→</span>
    </button>
  );
};

export default Button;
