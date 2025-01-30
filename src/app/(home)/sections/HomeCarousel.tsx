"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeHeroSection from "./HomeHeroSection";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { root_container } from "@/app/Providers";

const CustomPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-red-500 p-2 rounded-full hover:bg-black`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </button>
  );
};

const CustomNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </button>
  );
};

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  //   prevArrow: <CustomPrevArrow />,
  //   nextArrow: <CustomNextArrow />,
  dotsClass: "slick-dots custom-dots",
};

const HomeHeroCarousel: React.FC = () => {
  return (
    <div className={`${root_container} mt-10   relative rounded-lg`}>
      <Slider {...settings}>
        <div>
          <HomeHeroSection
            bgImg={"https://s3no.cashify.in/cashify/web/a86132414c264aeea04d15c795177ecd.webp?p=default&s=lg"}
            onActionButtonClick={() => {}}
          />
        </div>
        <div>
          <HomeHeroSection
            bgImg={"https://s3no.cashify.in/cashify/web/0f67dd24e97e4b9c90155539b002b0d4.webp?p=default&s=lg"}
            onActionButtonClick={() => {}}
          />
        </div>
        <div>
          <HomeHeroSection
            bgImg={"https://s3no.cashify.in/cashify/web/753432b9b22448d4950ce1d2f843d2a0.webp?p=default&s=lg"}
            onActionButtonClick={() => {}}
          />
        </div>
      </Slider>
      <style jsx global>{`
        .custom-dots li {
          margin: 0 2px;
        }
        .custom-dots li button:before {
          margin-top: 10px;
          font-size: 12px;
          width: 18px;
          height: 5px;
          opacity: 1;
          border-radius: 5px;
          background-color: #00000050;
          content: "";
        }
        .custom-dots li.slick-active button:before {
          background-color: #00a2e4;
        }
        .slick-prev,
        .slick-next {
          display: block !important;
          //   background-color: #ffffff;
          color: #000000;
          z-index: 10;

          width: 40px;
          height: 50px;
        }
        .slick-prev {
          left: -3px !important;
          //   border-radius: 0 5px 5px 0;
        }
        .slick-next {
          right: -3px !important;
          //   border-radius: 5px 0 0 5px;
        }
      `}</style>
    </div>
  );
};

export default HomeHeroCarousel;
