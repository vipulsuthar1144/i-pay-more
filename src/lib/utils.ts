import { TDevice } from "@schemas/product-category.schema";
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

export const formatPrice = (amount: number, currency: string = "INR", locale: string = "en-IN"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateDiscountedPrice = (actualPrice: number, discountPercentage: number): number => {
  return actualPrice - actualPrice * (discountPercentage / 100);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getDeviceType = (product_slug: string): TDevice => {
  if (product_slug.toLowerCase().includes("iphone")) return "IPHONES";
  if (product_slug.toLowerCase().includes("ipad")) return "IPADS";
  if (product_slug.toLowerCase().includes("mac")) return "MACBOOKS";
  return "IPHONES";
};
