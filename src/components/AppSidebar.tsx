"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  ShoppingBag,
  Wrench,
  Info,
  Phone,
  LogOut,
  ShoppingBasket,
  HandCoins,
  NotebookText,
  File,
} from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "Services",
    icon: ShoppingBag,
    subItems: [
      { name: "Sell", href: "/sell", icon: HandCoins },
      { name: "Buy", href: "/buy", icon: ShoppingBasket },
      { name: "Repair", href: "/repair", icon: Wrench },
    ],
  },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Contact Us", href: "/contact-us", icon: Phone },
  { name: "Privacy & Policy", href: "/policies/privacy", icon: NotebookText },
  { name: "Terms and Conditions", href: "/policies/conditions", icon: File },
  { name: "Logout", href: "/login", icon: LogOut },
];

export default function AppSidebar({
  accessToken,
  onLoginLogoutClick,
}: {
  accessToken: string;
  onLoginLogoutClick: VoidFunction;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOnItemClick = (href: string) => {
    setIsOpen(false);
    if (href == "/login") {
      onLoginLogoutClick();
    } else {
      router.push(href);
    }
  };

  return (
    <>
      {/* Menu Button */}
      <button onClick={() => setIsOpen(true)} className=" flex md:hidden p-2 focus:outline-none">
        <Menu className="w-8 h-8" />
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-white text-black z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-400">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-black focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subItems ? (
                  <>
                    {/* Dropdown Button */}
                    <button
                      className="w-full flex justify-between items-center text-sm px-6 py-3 hover:bg-primary/20 focus:outline-none"
                      onClick={() => setOpenDropdown(!openDropdown)}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </div>
                      {openDropdown ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    {/* Dropdown Menu */}
                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => handleOnItemClick(subItem.href)}
                            className="flex w-full items-center px-10 py-3 text-sm hover:bg-primary/20"
                          >
                            <subItem.icon className="w-5 h-5 mr-2" />
                            {subItem.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <button
                    onClick={() => handleOnItemClick(item.href)}
                    className={`flex w-full items-center px-6 text-sm py-3 ${
                      item.href === "/login" ? "hover:bg-red-500" : "hover:bg-primary/20"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.href === "/login" && accessToken && "Logout"}
                    {item.href === "/login" && !accessToken && "Login"}
                    {item.href !== "/login" && item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
