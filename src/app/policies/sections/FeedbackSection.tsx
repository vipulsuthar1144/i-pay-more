import { imgSellCover } from "@assets/images/home";
import FeedbackImage from "@assets/images/privacy-policy.svg";
import Image from "next/image";
import React from "react";

const FeedbackSection = () => {
  return (
    <div className="bg-gray-100 p-8 md:p-12 rounded-2xl  flex flex-col md:flex-row items-center">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-2xl lg:text-4xl font-bold text-black">
          We'd love to <br /> <span className="text-primary ml-5">hear from you</span>
        </h2>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        {/* <img src="/your-image-path.png" alt="Feedback" className="max-w-full h-auto" /> */}
        <Image
          src={FeedbackImage} // Replace with correct path
          alt="Sell Mobile"
          width={300}
          height={300}
          className="max-w-full h-auto"
        />
        {/* <FeedbackImage /> */}
      </div>
    </div>
  );
};

export default FeedbackSection;
