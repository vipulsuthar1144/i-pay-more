"use client";

import React, { useState } from "react";
import DeviceDetails from "./DeviceDetails";
import AboutStepOne from "./TellUsAboutCards/AboutStepOne";
import AboutStepFour from "./TellUsAboutCards/AboutStepFour";
import AboutStepTwo from "./TellUsAboutCards/AboutStepTwo";
import AboutStepThird from "./TellUsAboutCards/AboutStepThird";
import BreadCrumb from "@components/sections/BreadCrumb";
import useQueryParams from "@/config/hooks/useQueryParams";
import { ChevronRight, Home, HomeIcon } from "lucide-react";
import Link from "next/link";
import _ from "lodash";
import { ICalculateQueryParams } from "@schemas/calculate.schema";
import { useRouter } from "next/navigation";
import AboutStepFive from "./TellUsAboutCards/AboutStepFive";
import { IProductProblems } from "@schemas/order.schema";

const TOTAL_SELLING_STEPS = 5;
export default function TellUsAbout() {
  const [nestedStep, setNestedStep] = useState(1);
  const router = useRouter();
  const { getParams } = useQueryParams();
  const QueryParams = getParams();

  const [productProblems, setProductProblems] = useState<IProductProblems>({
    basic: [],
    defects: [],
    functional: [],
    accessories: [],
  });

  const handleContinue = () => {
    if (nestedStep < TOTAL_SELLING_STEPS) {
      setNestedStep((prevStep) => prevStep + 1); // Move to the next nested step
    } else {
      //   setStepNum((prevStep: any) => prevStep + 1); // Move to the next main step
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  const handleBack = () => {
    if (nestedStep > 1) {
      setNestedStep((prevStep) => prevStep - 1); // Move to the previous nested step
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  const getNestedContent = () => {
    switch (nestedStep) {
      case 1:
        return (
          <AboutStepOne
            setProductProblems={setProductProblems}
            productProblems={productProblems}
            handleContinue={handleContinue}
          />
        );
      case 2:
        return (
          <AboutStepTwo
            setProductProblems={setProductProblems}
            productProblems={productProblems}
            handleContinue={handleContinue}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <AboutStepThird
            setProductProblems={setProductProblems}
            productProblems={productProblems}
            handleContinue={handleContinue}
            handleBack={handleBack}
          />
        );
      case 4:
        return (
          <AboutStepFour
            setProductProblems={setProductProblems}
            productProblems={productProblems}
            handleContinue={handleContinue}
            handleBack={handleBack}
            // setStepNum={setStepNum}
          />
        );
      case 5:
        return (
          <AboutStepFive
            setProductProblems={setProductProblems}
            productProblems={productProblems}
            handleContinue={handleContinue}
            handleBack={handleBack}
            // setStepNum={setStepNum}
          />
        );
      default:
        return null;
    }
  };

  const renderBreadcrumb = () => {
    const BreadcrumbList = [
      { name: "Home", route: "/", icon: Home },
      { name: _.capitalize(QueryParams.st), route: `/${QueryParams.st?.toLowerCase()}` },
      {
        name: _.capitalize(QueryParams.cid),
        route: `/${QueryParams.st?.toLowerCase()}/${QueryParams.cid?.toLowerCase()}`,
      },
      {
        name: QueryParams.pmn,
        route: `/${QueryParams.st?.toLowerCase()}/${QueryParams.cid?.toLowerCase()}/${QueryParams.pslg}`,
      },
      { name: "Device Info", route: "/calculate" },
    ];
    return (
      <>
        <nav aria-label="breadcrumb" className=" rounded-md">
          <ol className="flex flex-wrap items-center text-sm">
            {BreadcrumbList.map((item, index) => {
              const isLast = index === BreadcrumbList.length - 1;

              return (
                <li key={index} className="flex items-center">
                  {index == 0 ? (
                    <HomeIcon className="mr-1 text-gray-500" size={16} />
                  ) : (
                    <ChevronRight className="mx-2 text-gray-500" size={16} />
                  )}
                  {isLast ? (
                    <span className="text-gray-900  capitalize">{item.name}</span>
                  ) : (
                    <Link href={item.route} className="text-gray-500 capitalize hover:underline hover:text-black">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </>
    );
  };

  if (!QueryParams.pid || !QueryParams.pslg) {
    router.replace("/");
    return;
  }

  return (
    <div className=" container m-auto py-10 space-y-5  ">
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">Sell Old {QueryParams.pmn}</h2>
      {/* <Breadcrumb /> */}
      {renderBreadcrumb()}
      <div className="w-full h-full flex flex-col sm:flex-row justify-between p-4 md:space-y-0 space-y-5">
        {getNestedContent()}
        <DeviceDetails productProblems={productProblems} />
      </div>
    </div>
  );
}
