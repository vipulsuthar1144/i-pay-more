import { InfiniteMovingCards } from "@components/ui/Infinite-moving-cards";
import { dataReviewList } from "@data/reviewData";
import React from "react";

const HomeReviewSection = () => {
  return (
    // <div className="container m-auto rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
    <section className="container m-auto space-y-5">
      <h2 className="text-3xl font-bold font-heading">
        Trusted by 135.39 Lac + Happy Users and Major Brands since 2015
      </h2>
      <InfiniteMovingCards items={dataReviewList} direction="right" speed="slow" />
    </section>
    // </div>
  );
};

export default HomeReviewSection;
