import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { LocalStorageKeys } from "@lib/constants";
import { IUserSchema } from "@schemas/base.shema";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Profile = ({ accessToken, onLoginLogoutClick }: { accessToken: string; onLoginLogoutClick: VoidFunction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData] = useLocalStorage<IUserSchema | null>(LocalStorageKeys.USER_DATA, null);
  const router = useRouter();

  const menuItems = [
    { label: "Orders", href: "/orders" },
    // { label: "Saved Payments", href: "/payments" },
    // { label: "Saved Address", href: "/address" },
    // { label: "My Earnings", href: "/earnings" },
    { label: "Log Out", href: "/logout" },
  ];

  const handleItemClick = (href: any) => {
    setIsOpen(false);

    if (href === "/logout") {
      onLoginLogoutClick();
      return;
    }
    router.push(href);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-2 px-4 py-2">
        <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-base text-gray-800">{userData?.full_name}</span>
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-0 w-48 bg-white shadow-lg border border-gray-200">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.href)}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-primary/5 cursor-pointer focus:outline-none focus:bg-gray-100 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
