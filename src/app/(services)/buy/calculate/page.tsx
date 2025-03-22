"use client";

import CalculatePage from "@/app/common/CalculatePage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatePage serviceType="BUY" totalSteps={1} />
    </Suspense>
  );
};

export default page;
