"use client";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: VoidFunction;
  disabled?: boolean;
  className?: string;
  haveRightArrow?: boolean;
  haveLeftArrow?: boolean;
}

const Button = ({
  label,
  onClick,
  disabled,
  className,
  haveLeftArrow = false,
  haveRightArrow = false,
  ...props
}: IButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-black disabled:cursor-not-allowed disabled:opacity-60 text-white py-2 px-6 rounded-md flex items-center justify-center shadow-md hover:bg-gray-800 transition-all ease-in-out duration-300 ${className}`}
      {...props}
    >
      {haveLeftArrow && <MoveLeftIcon size={15} className="mr-2" />}
      {label}
      {haveRightArrow && <MoveRightIcon size={15} className="ml-2" />}
    </button>
  );
};

export default Button;
