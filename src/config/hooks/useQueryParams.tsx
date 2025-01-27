"use client";

import { ICalculateQueryParams } from "@schemas/calculate.schema";
import { useRouter, useSearchParams } from "next/navigation";

// Extend `ICalculateQueryParams` to allow optional and undefined values
type PartialICalculateQueryParams = Partial<Record<keyof ICalculateQueryParams, string | undefined>>;

const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Get all current query parameters as a strongly-typed object.
   * @returns {Partial<ICalculateQueryParams>} The current query parameters.
   */
  const getParams = (): Partial<ICalculateQueryParams> => {
    const params: Partial<ICalculateQueryParams> = {}; // Use Partial<> for optional handling
    searchParams.forEach((value, key) => {
      if (key in params || (key as keyof ICalculateQueryParams)) {
        // Dynamically assign if the key is valid
        (params as any)[key] = value;
      }
    });
    return params;
  };
  /**
   * Set or update query parameters.
   * @param {PartialICalculateQueryParams} newParams - Object of query params to set or update. Use `undefined` to delete a param.
   */
  const setParams = (newParams: PartialICalculateQueryParams): string => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.keys(newParams).forEach((key) => {
      if (newParams[key as keyof ICalculateQueryParams] === undefined) {
        currentParams.delete(key); // Remove param if value is undefined
      } else {
        currentParams.set(key, newParams[key as keyof ICalculateQueryParams] as string);
      }
    });

    // Update the route with the new query params
    // router.push(`?${currentParams.toString()}`);
    return currentParams.toString() ? `?${currentParams.toString()}` : "";
  };

  return {
    getParams,
    setParams,
  };
};

export default useQueryParams;
