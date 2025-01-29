import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractIDfromString = (str?: string): number | null => {
  if (!str) return null;
  const match = str.match(/-(\d+)$/); // Match the last hyphen followed by numbers at the end
  return match ? parseInt(match[1], 10) : null;
};

export const removeNumberFromString = (str?: string): string => {
  if (!str) return "";
  return str.replace(/\d+/g, ""); // Removes all digits
};
