import { root_container } from "@/app/Providers";
import { InfiniteMovingCards } from "@components/static/Infinite-moving-cards";
import { dataReviewList } from "@data/reviewData";
import React from "react";

const HomeReviewSection = () => {
  return (
    <section className={root_container}>
      {/* <h2 className="text-xl md:text-2xl  font-bold"></h2> */}
      <div>
        <h2 className="text-xl md:text-2xl px-5 md:px-0  font-bold mb-1">
          Trusted Feedback from Our Valued Apple Customers
        </h2>
        <p className="text-xs md:text-sm font-bold text-primary font-heading">Sell Your Apple Device with Us</p>
      </div>
      <InfiniteMovingCards items={dataReviewList} direction="left" speed="slow" />
    </section>
  );
};

export default HomeReviewSection;
