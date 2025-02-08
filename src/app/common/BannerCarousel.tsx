"use client"; // Required if using Next.js App Router

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // For custom arrows
import { root_container } from "@/app/Providers";
import { homeBanner1, homeBanner2 } from "@assets/images/banners";

export default function BannerCarousel({
  images = [homeBanner1, homeBanner2],
}: {
  images?: string[] | StaticImageData[];
}) {
  return (
    <div className={`relative ${root_container} `}>
      {/* Swiper Container */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{
          // el: ".custom-dots",
          clickable: true,
          //   renderBullet: (index, className) =>
          // `<span class="${className} bg-black text-black w-10 h-10 rounded-full transition-all duration-300"></span>`,
        }}
        className="w-full h-auto min-h-[150px] flex justify-center items-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images?.map((src, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center rounded-xl overflow-hidden items-center min-h-[150px] h-auto max-h-[400px]"
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={10000}
              height={1000}
              className="w-full  h-full object-fill aspect-video rounded-xl"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="custom-prev absolute top-1/2 left-0 z-10 m-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-se-md rounded-ee-md transition"
        style={{
          margin: 0,
        }}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="custom-next absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white text-black p-2 rounded-ss-md rounded-es-md transition"
        style={{
          margin: 0,
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Custom Pagination Dots */}
      {/* <div className="custom-dots  absolute z-15 bottom-2- left-1/2 transform -translate-x-1/2 flex space-x-2"></div> */}
    </div>
  );
}
