"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./static/Navbar-menu";
import { HandCoins, ShoppingBasket, Wrench } from "lucide-react";
import Link from "next/link";

export function AppNavBar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const SERVICES = [
    {
      icon: HandCoins,
      lable: "Sell",
      route: "/sell",
      desc: "Get the maximum value for your old smartphone with our hassle-free process. Enjoy a secure transaction and free doorstep pickup!",
    },
    {
      icon: ShoppingBasket,
      lable: "Buy",
      route: "/buy",
      desc: "Get the maximum value for your old smartphone with our hassle-free process. Enjoy a secure transaction and free doorstep pickup!",
    },
    {
      icon: Wrench,
      lable: "Repair",
      route: "/repair",
      desc: " Get the maximum value for your old smartphone with our hassle-free process. Enjoy a secure transaction and free doorstep pickup!",
    },
  ];
  return (
    <div className={cn("p-0 space-y-0 m-0 hidden md:flex", className)}>
      <Menu setActive={setActive}>
        {/* <MenuItem setActive={setActive} active={active} item="Home"></MenuItem> */}
        <Link href={"/"} className="text-sm md:text-base  hover:underline cursor-pointer">
          Home
        </Link>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col text-sm max-w-sm">
            {SERVICES.map(({ icon: Icon, lable, route, desc }, index) => (
              <HoveredLink key={route} href={route}>
                <div className="flex items-center gap-2 hover:bg-gray-100 px-3 py-5 pe-5 group">
                  <div className="min-w-12 p-2 text-gray-500 group-hover:text-black transition-all duration-200">
                    <Icon size={30} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">{lable}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              </HoveredLink>
            ))}
          </div>
        </MenuItem>
        {/* <Link href={"/about"} className="text-sm md:text-base  hover:underline cursor-pointer">
          About Us
        </Link> */}
        <Link href={"/contact-us"} className="text-sm md:text-base  hover:underline cursor-pointer">
          Contact Us
        </Link>
      </Menu>
    </div>
  );
}
