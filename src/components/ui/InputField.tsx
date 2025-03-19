import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  ...props
}) => (
  <div>
    <label htmlFor={name} className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value ?? ""}
      className={`w-full px-3 text-xs md:text-sm py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${error ? "border-red-500" : "border-gray-300"}`}
      onChange={onChange}
      {...props}
    />
    {error && <span className="text-red-500 text-xs md:text-sm mt-1">{error}</span>}
  </div>
);

export default InputField;
