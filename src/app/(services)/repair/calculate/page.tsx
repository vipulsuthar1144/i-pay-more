"use client";

import CalculatePage from "@/app/common/CalculatePage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatePage serviceType="REPAIR" totalSteps={2} />
    </Suspense>
  );
};

export default page;
