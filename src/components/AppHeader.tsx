import { appLogo } from "@assets/images/home";
import { Apple, Cross, CrossIcon, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Header */}
      <div className="container mx-auto  py-3 flex items-center justify-between">
        {/* Logo */}`{" "}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {/* <Apple className="h-8 w-8 text-gray-900" /> */}
            <Image src={appLogo} alt={"App Logo"} width={50} height={50} />
            {/* <span className="ml-2 text-xl font-bold text-gray-900">IPM</span> */}
          </Link>
        </div>
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6 relative">
          <SearchIcon className="absolute top-2.5 left-2.5 text-gray-700" size={20} />
          <input
            type="text"
            placeholder="Search for services, products, or help..."
            className=" w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 bg-gray-100 focus:outline-none"
          />
          <X className="absolute top-2 right-3 text-gray-700" size={24} />
        </div>
        {/* Login */}
        <div className="flex items-center space-x-4">
          {/* <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 text-sm transition duration-300"
          >
            Login
          </Link> */}
          <button className="bg-black text-white py-2 px-6 rounded-lg flex items-center justify-center shadow-md hover:bg-gray-800 transition duration-300">
            Login
            {/* <span className="ml-2">→</span> */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
