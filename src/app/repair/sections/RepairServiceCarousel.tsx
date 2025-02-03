import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { root_container } from "@/app/Providers";
import { dataRepairServiceList } from "@data/repairServices";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@components/sections/ProductCard";
import { RepairAPI } from "@/services/repair.service";
import { IRepairServiceSchema } from "@schemas/repair-services.schema";
import { useRouter } from "next/navigation";
import ProductCardSekeleton from "@components/skeletons/ProductCardSekeleton";
import FallbackError from "@components/FallbackError";

// Sample Data
const categories = [
  { img: "/icons/screen.png", title: "SCREEN" },
  { img: "/icons/battery.png", title: "BATTERY" },
  { img: "/icons/mic.png", title: "MIC" },
  { img: "/icons/receiver.png", title: "RECEIVER" },
  { img: "/icons/charging-jack.png", title: "CHARGING JACK" },
  { img: "/icons/speaker.png", title: "SPEAKER" },
  { img: "/icons/back-panel.png", title: "BACK PANEL" },
];

const CategoryCarousel = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 7;
  const router = useRouter();
  const [repairServiceData, setRepairServiceData] = useState<{
    loading: boolean;
    error: string | null;
    serviceList: IRepairServiceSchema[];
  }>({
    loading: false,
    error: null,
    serviceList: [],
  });
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5, slidesToScroll: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide >= (repairServiceData.loading ? 10 : dataRepairServiceList.length) - slidesToShow;

  useEffect(() => {
    handleGetRepairServiceAPI();
  }, []);

  const handleGetRepairServiceAPI = async () => {
    try {
      setRepairServiceData({ loading: true, error: null, serviceList: [] });
      const response = await RepairAPI.getServices();
      setRepairServiceData({ loading: false, error: null, serviceList: response?.services ?? [] });
    } catch (error: any) {
      setRepairServiceData({ loading: false, error: error || "Something wents wrong", serviceList: [] });
    }
  };

  const renderContent = () => {
    if (repairServiceData?.error && !repairServiceData?.loading) return <FallbackError type="something_went_wrong" />;
    if (!repairServiceData?.error && !repairServiceData?.loading && repairServiceData.serviceList.length == 0)
      return <FallbackError type="data_not_found" />;
    return (
      <div className="relative">
        <button
          disabled={isFirstSlide}
          className="disabled:cursor-not-allowed  hidden md:block absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <ChevronLeft />
        </button>

        <Slider ref={sliderRef} {...settings}>
          {repairServiceData.loading
            ? Array.from({ length: slidesToShow }).map((item, index) => (
                <div key={index} className="p-2 cursor-pointer">
                  <div key={index} className="w-full h-[180px]  bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
              ))
            : dataRepairServiceList.map((item, index) => (
                <div key={index} className="p-2 cursor-pointer">
                  <ProductCard
                    key={item?.id}
                    title={item?.n ?? ""}
                    img={item?.iu ?? ""}
                    addBaseUrl={false}
                    // onClick={() => router.push(`/repair/${item.category_name?.toLowerCase()}-${item.category_id}`)}
                  />
                </div>
              ))}
        </Slider>

        {/* Right Arrow */}

        <button
          disabled={isLastSlide}
          className="disabled:cursor-not-allowed hidden md:block  absolute right-[-10px] top-1/2 transform -translate-y-1/2 bg-white p-2 m-0 shadow-md rounded-full z-10"
          style={{
            margin: 0,
          }}
          onClick={() => sliderRef.current?.slickNext()}
        >
          <ChevronRight />
        </button>
      </div>
    );
  };

  return (
    <section className={`${root_container} relative`}>
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl  font-bold font-heading">Our Repair Services</h2>
        <p className="text-xs md:text-sm font-bold text-primary font-heading">Repair Your Apple Device with Us</p>
      </div>
      {renderContent()}
    </section>
  );
};

export default CategoryCarousel;
