"use client";

import { imgHomeCoverImg, imgHomeHeroSection } from "@assets/images/home";
import { HandCoins, ShoppingBasket, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomeHeroSection = ({ onActionButtonClick }: { onActionButtonClick: VoidFunction }) => {
  const btnStyle =
    " text-white hover:scale-105 border-2 border-white hover:bg-white hover:text-black py-2 px-5 rounded-lg shadow-lg text-md font-semibold transition  duration-75 flex items-center justify-center gap-2";

  return (
    <section className="relative h-[500px] container m-auto flex items-center rounded-xl overflow-hidden p-5">
      <div className="absolute inset-0">
        <Image src={imgHomeCoverImg} alt="Apple products" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Your Trusted Apple Device Marketplace</h1>
        <p className="text-xl text-gray-200 mb-8">Buy, Sell, and Repair Apple devices with confidence</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Sell Button */}
          <Link href={"/sell"} className={btnStyle}>
            <HandCoins />
            Sell
          </Link>

          {/* Buy Button */}
          <Link href={"/buy"} className={btnStyle}>
            <ShoppingBasket />
            Buy
          </Link>

          {/* Repair Button */}
          <Link href={"/repair"} className={btnStyle}>
            <Wrench />
            Repair
          </Link>
        </div>
      </div>
    </section>
  );
  // return (

  // <section className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl py-16 px-8">
  //   <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
  //     {/* Left Content */}
  //     <div className="lg:w-1/2 w-full">
  //       <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
  //         Sell, Repair, or Buy <span className="text-yellow-300">Apple Devices</span> with Ease
  //       </h1>
  //       <p className="text-base sm:text-lg mb-8 text-gray-200">
  //         Get the best price for your used Apple devices, trusted repairs, or buy pre-owned Apple products at
  //         unbeatable prices. All in one place.
  //       </p>
  //       <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
  //         {/* Sell Button */}
  //         <a
  //           href="#sell"
  //           className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black py-3 px-6 rounded-lg shadow-lg text-lg font-semibold transition flex items-center justify-center gap-2"
  //         >
  //           <HandCoins />
  //           Sell Now
  //         </a>

  //         {/* Repair Button */}
  //         <a
  //           href="#repair"
  //           className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white py-3 px-6 rounded-lg shadow-lg text-lg font-semibold transition flex items-center justify-center gap-2"
  //         >
  //           <Wrench />
  //           Repair Device
  //         </a>

  //         {/* Buy Button */}
  //         <a
  //           href="#buy"
  //           className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white py-3 px-6 rounded-lg shadow-lg text-lg font-semibold transition flex items-center justify-center gap-2"
  //         >
  //           <ShoppingBasket />
  //           Buy Now
  //         </a>
  //       </div>
  //     </div>

  //     {/* Right Content - Image */}
  //     <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
  //       <div className="relative">
  //         <Image
  //           src={imgHomeHeroSection}
  //           alt="Cashify Hero"
  //           className="rounded-lg shadow-lg transform transition-transform duration-300"
  //         />
  //         <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-400 rounded-full shadow-md animate-bounce"></div>
  //         <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-yellow-500 rounded-full shadow-md"></div>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  // );
};

export default HomeHeroSection;
