import { root_container } from "@/app/Providers";
import { InfiniteMovingCards } from "@components/ui/Infinite-moving-cards";
import { dataReviewList } from "@data/reviewData";
import React from "react";

const HomeReviewSection = () => {
  return (
    <section className={root_container}>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Trusted Feedback from Our Valued Apple Customers</h2>
      <InfiniteMovingCards items={dataReviewList} direction="left" speed="slow" />
    </section>
  );
};

export default HomeReviewSection;
