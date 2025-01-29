"use client";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: VoidFunction;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  haveRightArrow?: boolean;
  haveLeftArrow?: boolean;
}

const Button = ({
  label,
  onClick,
  disabled,
  isLoading = false,
  className,
  haveLeftArrow = false,
  haveRightArrow = false,
  ...props
}: IButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`bg-black relative disabled:cursor-not-allowed overflow-hidden disabled:bg-black/50 text-white py-2 px-6 rounded-md flex items-center justify-center shadow-md hover:bg-gray-800 transition-all ease-in-out duration-300 ${className}`}
      {...props}
    >
      {isLoading && (
        <div className="w-full h-full absolute flex justify-center items-center bg-black/50">
          <span className="w-5 h-5 border-2   border-white border-t-transparent rounded-full animate-spin"></span>
        </div>
      )}

      {haveLeftArrow && <MoveLeftIcon size={15} className="mr-2" />}
      {label}
      {haveRightArrow && <MoveRightIcon size={15} className="ml-2" />}
    </button>
  );
};

export default Button;
