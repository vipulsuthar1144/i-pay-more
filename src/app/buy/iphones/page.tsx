"use client";

import Breadcrumb from "@components/sections/BreadCrumb";
import ProductCard from "@components/sections/ProductCard";
import { dataIPhoneList } from "@data/iPhonsData";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const navigate = useRouter();

  // States for search query and filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dataIPhoneList);
  const [error, setError] = useState<string | null>(null);

  // Debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      try {
        // Filter models by search query
        const filtered = dataIPhoneList.filter((item) => item.model.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filtered);
        setError(null); // Clear error if filtering works
      } catch (err) {
        setError("Something went wrong while searching.");
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [searchQuery]);

  const listenerGoToProductDetails = (navigateRoute: string) => {
    navigate.push(`/buy/iphones/${navigateRoute}`);
  };

  return (
    <section className="container m-auto pt-10 space-y-5">
      <h2 className="text-2xl font-semibold text-gray-900 font-heading">Buy iPhone</h2>
      <Breadcrumb />
      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-medium text-gray-900 font-heading">Select Model</p>
        <div className="relative">
          <SearchIcon className="absolute top-2.5 left-2.5 text-gray-700" size={20} />
          <input
            type="text"
            placeholder="Search model"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="w-[250px] pl-10 pr-4 py-2 border-[1px] border-[#d2d2d7] rounded-lg text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-7">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <ProductCard
              key={index}
              title={item.model}
              img={item.image}
              onClick={() => listenerGoToProductDetails(item.slug)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-700">No models found matching your search.</p>
        )}
      </div>
    </section>
  );
};

export default page;
