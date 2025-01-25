import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

// Utility function to format route names
const formatSegment = (segment: string) => {
  return segment
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  // Split the pathname into segments
  const pathnames = pathname?.split("/").filter((x) => x) || [];

  return (
    <nav aria-label="breadcrumb" className=" rounded-md">
      <ol className="flex flex-wrap items-center text-sm">
        {/* Home Icon */}
        <li>
          <Link href="/" className="text-gray-500 hover:underline hover:text-black flex items-center">
            <Home className="mr-1" size={16} />
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <li key={href} className="flex items-center">
              {/* Separator Icon */}
              <ChevronRight className="mx-2 text-gray-500" size={16} />
              {isLast ? (
                <span className="text-gray-500">{formatSegment(value)}</span>
              ) : (
                <Link href={href} className="text-gray-500 hover:underline hover:text-black">
                  {formatSegment(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
