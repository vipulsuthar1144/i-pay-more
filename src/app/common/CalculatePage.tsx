"use client";

import useQueryParams from "@/config/hooks/useQueryParams";
import { SaleLeadsAPI } from "@/services/order.service";
import { IAddressSchema, IProductProblems } from "@schemas/order.schema";
import _ from "lodash";
import { ChevronRight, Home, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { removeNumberFromString } from "@lib/utils";
import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { LocalStorageKeys } from "@lib/constants";
import { useAppDispatch } from "@/store";
import { toggleLoginDialogState } from "@/store/slices/auth.slice";
import { IUserSchema } from "@schemas/base.shema";
import { AddressAPI } from "@/services/address.service";
import { root_container } from "@/app/Providers";
import StepsContainer from "./StepsContainer";
import Step1 from "../(services)/sell/calculate/steps/Step1";
import Step2 from "../(services)/sell/calculate/steps/Step2";
import Step3 from "../(services)/sell/calculate/steps/Step3";
import Step4 from "../(services)/sell/calculate/steps/Step4";
import RepairStep1 from "../(services)/repair/calculate/steps/Step1";
import AddressForm from "./AddressForm";
import OrderPlacedDialog from "./DialogOrderPlaced";
import DeviceDetails from "./DeviceDetails";
import { TService } from "@schemas/product-category.schema";

interface ICalculatePageProps {
  serviceType: TService;
  totalSteps: number;
}

export default function CalculatePage({ serviceType, totalSteps }: ICalculatePageProps) {
  const { getParams } = useQueryParams();
  const [USER_DATA, __] = useLocalStorage<IUserSchema | null>(LocalStorageKeys.USER_DATA, null);
  const QueryParams = getParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("Selected Apple Device");
  const [currentStep, setCurrentStep] = useState(1);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isCreateSellLeadsLoading, setIsCreateSellLeadsLoading] = useState(false);
  const [productProblems, setProductProblems] = useState<IProductProblems>({
    basic: [],
    defects: [],
    functional: [],
    accessories: [],
    repair_services: [],
  });

  useEffect(() => {
    switch (serviceType.toLowerCase()) {
      case "sell":
        setTitle("Sell Your ");
        break;

      case "buy":
        setTitle("Buy ");
        break;

      case "sell":
        setTitle("Repair Your ");
        break;

      default:
        break;
    }
  }, []);

  const handleContinue = () => {
    if (serviceType == "SELL" || serviceType == "REPAIR") {
      if (currentStep == totalSteps) {
        document.getElementById("address-submit-btn")?.click();
      } else if (currentStep == totalSteps - 1) {
        const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)
          ? JSON.parse(localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) ?? "")
          : null;
        if (accessToken) {
          setCurrentStep((prevStep) => prevStep + 1);
        } else {
          dispatch(toggleLoginDialogState());
        }
      } else {
        currentStep < totalSteps && setCurrentStep((prevStep) => prevStep + 1);
      }
    }
    if (serviceType == "BUY") {
      const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)
        ? JSON.parse(localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) ?? "")
        : null;
      if (accessToken) {
        document.getElementById("address-submit-btn")?.click();
      } else {
        dispatch(toggleLoginDialogState());
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1); // Move to the previous nested step
    }
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  const handleCreateSaleLeadsAPI = async (address: IAddressSchema) => {
    try {
      setIsCreateSellLeadsLoading(true);
      const addressData = await AddressAPI.update(address);
      if (addressData?.id) {
        await SaleLeadsAPI.create({
          name: address.name,
          mobile: address.phone_no,
          email: USER_DATA?.email,
          city: address.city,
          state: address.state,
          color_id: Number(QueryParams.pclrid),
          address_id: Number(addressData?.id),
          product_id: Number(QueryParams.pid),
          variant_id: Number(QueryParams.pvid),
          type: serviceType,
          lead_details: {
            address: address,
            questions: productProblems,
          },
        });
        setOpenSuccessDialog(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreateSellLeadsLoading(false);
    }
  };

  const renderSteps = () => {
    if (serviceType == "SELL") {
      switch (currentStep) {
        case 1:
          return (
            <StepsContainer
              handleBack={handleBack}
              handleContinue={handleContinue}
              title="Tell Us More About Your Device"
              subTitle="The better condition your device is in, the more we will pay you."
              currentStep={currentStep}
            >
              <Step1
                setProductProblems={setProductProblems}
                deviceType={QueryParams.dt}
                productProblems={productProblems}
              />
            </StepsContainer>
          );
        case 2:
          return (
            <StepsContainer
              handleBack={handleBack}
              handleContinue={handleContinue}
              title="Select screen/body defects that are applicable!"
              subTitle="Please provide correct details"
              currentStep={currentStep}
            >
              <Step2 setProductProblems={setProductProblems} productProblems={productProblems} />
            </StepsContainer>
          );
        case 3:
          return (
            <StepsContainer
              handleBack={handleBack}
              handleContinue={handleContinue}
              title="Functional or Physical Problems"
              subTitle="Please choose appropriate condition to get accurate quote"
              currentStep={currentStep}
            >
              <Step3 setProductProblems={setProductProblems} productProblems={productProblems} />
            </StepsContainer>
          );
        case 4:
          return (
            <StepsContainer
              handleBack={handleBack}
              handleContinue={handleContinue}
              title="Do you have the following?"
              subTitle="Please select accessories which are available"
              currentStep={currentStep}
            >
              <Step4 setProductProblems={setProductProblems} productProblems={productProblems} />
            </StepsContainer>
          );
        case 5:
          return (
            <StepsContainer
              handleBack={handleBack}
              handleContinue={handleContinue}
              title="You Are Almost Done"
              subTitle="Fill Your Address Details"
              currentStep={currentStep}
              isLoading={isCreateSellLeadsLoading}
            >
              <AddressForm onSubmit={handleCreateSaleLeadsAPI} />
            </StepsContainer>
          );
        default:
          return null;
      }
    }
    if (serviceType == "BUY") {
      USER_DATA;
      return (
        <StepsContainer
          handleContinue={handleContinue}
          title="Your Address"
          subTitle="Fill Your Address Details"
          currentStep={1}
          isLoading={isCreateSellLeadsLoading}
          className="sm:w-full sm:mr-0"
        >
          <AddressForm onSubmit={handleCreateSaleLeadsAPI} />
        </StepsContainer>
      );
    }
    if (serviceType == "REPAIR") {
      switch (currentStep) {
        case 1:
          return (
            <StepsContainer
              handleBack={handleBack}
              handleContinue={handleContinue}
              title="Select Repair Services"
              subTitle="Please provide correct details"
              currentStep={currentStep}
            >
              <RepairStep1 setProductProblems={setProductProblems} productProblems={productProblems} />
            </StepsContainer>
          );
        case 2:
          return (
            <StepsContainer
              handleBack={handleBack}
              handleContinue={handleContinue}
              title="Your Address"
              subTitle="Fill Your Address Details"
              currentStep={currentStep}
              isLoading={isCreateSellLeadsLoading}
            >
              <AddressForm onSubmit={handleCreateSaleLeadsAPI} />
            </StepsContainer>
          );
        default:
          return null;
      }
    }
  };

  const renderBreadcrumb = () => {
    const categoryName = _.capitalize(removeNumberFromString(QueryParams.cid).replace(/-/g, " "));
    const BreadcrumbList = [
      { name: "Home", route: "/", icon: Home },
      { name: _.capitalize(QueryParams.st), route: `/${QueryParams.st?.toLowerCase()}` },
      {
        name: categoryName,
        route: `/${QueryParams.st?.toLowerCase()}/${QueryParams.cid?.toLowerCase()}`,
      },
      {
        name: QueryParams.pmn,
        route: `/${QueryParams.st?.toLowerCase()}/${QueryParams.cid?.toLowerCase()}/${QueryParams.pslg}-${QueryParams.pid}`,
      },
      { name: "Device Info", route: "/calculate" },
    ];
    return (
      <>
        <nav aria-label="breadcrumb" className=" rounded-md">
          <ol className="flex flex-nowrap overflow-x-auto items-center text-sm">
            {BreadcrumbList.map((item, index) => {
              const isLast = index === BreadcrumbList.length - 1;

              return (
                <li key={index} className="flex text-nowrap items-center">
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
    <div className={`${root_container} pt-10`}>
      <OrderPlacedDialog
        isOpen={openSuccessDialog}
        onClose={() => {
          setOpenSuccessDialog(false);
          router.replace("/");
        }}
      />
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">
        {title} {QueryParams.pmn}
      </h2>
      {renderBreadcrumb()}
      <div className="w-full h-full flex flex-col sm:flex-row justify-between md:space-y-0 space-y-5">
        {renderSteps()}
        <DeviceDetails productProblems={productProblems} />
      </div>
    </div>
  );
}
