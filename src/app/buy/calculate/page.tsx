"use client";

import useQueryParams from "@/config/hooks/useQueryParams";
import { SaleLeadsAPI } from "@/services/order.service";
import { IAddressSchema, IProductProblems } from "@schemas/order.schema";
import _ from "lodash";
import { ChevronRight, Home, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeNumberFromString } from "@lib/utils";
import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { LocalStorageKeys } from "@lib/constants";
import { useAppDispatch } from "@/store";
import { toggleLoginDialogState } from "@/store/slices/auth.slice";
import { IUserSchema } from "@schemas/base.shema";
import { AddressAPI } from "@/services/address.service";
import StepsContainer from "@/app/sell/calculate/sections/steps/StepsContainer";
import OrderPlacedDialog from "@/app/sell/calculate/sections/DialogSumitted";
import AddressForm from "@/app/sell/calculate/sections/steps/AddressForm";

export default function TellUsAbout() {
  const { getParams } = useQueryParams();
  const [USER_DATA, __] = useLocalStorage<IUserSchema | null>(LocalStorageKeys.USER_DATA, null);
  const QueryParams = getParams();
  const router = useRouter();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [isCreateSellLeadsLoading, setIsCreateSellLeadsLoading] = useState(false);

  const handleContinue = () => {
    document.getElementById("address-submit-btn")?.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateSaleLeadsAPI = async (address: IAddressSchema) => {
    try {
      setIsCreateSellLeadsLoading(true);
      await AddressAPI.update(address);
      await SaleLeadsAPI.create({
        name: address.name,
        mobile: address.phone_no,
        email: "random@user.com",
        city: address.city,
        state: address.state,
        color_id: Number(QueryParams.pclrid),
        address_id: Number(USER_DATA?.address?.id),
        product_id: Number(QueryParams.pid),
        variant_id: Number(QueryParams.pvid),
        lead_details: {
          address: address,
          // questions: productProblems,
        },
      });
      setOpenSuccessDialog(true);
    } catch (error) {
      // toastUtils.error("Failed to create sale leads. Please try again later.");
      console.error(error);
    } finally {
      setIsCreateSellLeadsLoading(false);
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
      { name: "Address", route: "/calculate" },
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
      <OrderPlacedDialog
        isOpen={openSuccessDialog}
        onClose={() => {
          setOpenSuccessDialog(false);
          router.replace("/");
        }}
      />
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">Buy Refurbished {QueryParams.pmn}</h2>
      {renderBreadcrumb()}
      <div className="w-full h-full flex flex-col sm:flex-row justify-between md:space-y-0 space-y-5">
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
      </div>
    </div>
  );
}
