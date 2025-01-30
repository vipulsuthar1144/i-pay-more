"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { imgHomeHeroSection, imgSellCover } from "@assets/images/home";
import { root_container } from "@/app/Providers";

export default function SellHeroSection() {
  return (
    <section className={`bg-gray-100 p-8 rounded-xl ${root_container} space-y-0 flex items-center gap-6`}>
      {/* Left Side Content */}
      <div className="flex-1  md:text-left space-y-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold">
          Sell your Mobile Phone for <br /> Instant Cash
        </h1>
        <p className="text-gray-600 text-xs sm:text-md md:text-md mt-3">
          Get the maximum value for your old smartphone with our hassle-free process. Enjoy a secure transaction and
          free doorstep pickup!
        </p>
        <div className="tems-center space-y-2 text-green-600 text-xs sm:text-md md:text-md font-medium">
          <p>&#10004; Maximum Value</p>
          <p>&#10004; Safe & Hassle-free</p>
          <p>&#10004; Free Doorstep Pickup</p>
        </div>
        {/* Search Bar */}
        {/* <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search your Mobile Phone to sell"
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div> */}
      </div>

      {/* Right Side Image */}
      <div className=" flex items-center  w-1/3 md:w-1/2 justify-center">
        <Image
          src={imgSellCover} // Replace with correct path
          alt="Sell Mobile"
          width={500}
          height={500}
          className="object-contain mix-blend-multiply rounded-full"
        />
      </div>
    </section>
  );
}
