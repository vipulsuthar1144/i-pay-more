"use client";

import { root_container } from "@/app/Providers";
import { Calendar, HandCoins, Handshake, PhoneIcon, TabletIcon } from "lucide-react";

export default function HomeWorkingSection() {
  const workingData = [
    {
      title: "Submit Your Device",
      description: "Fill out a simple form with details about your Apple device-model, condition, and specifications.",
      icon: <TabletIcon size={50} className="text-5xl text-primary  mx-auto mb-4" />,
    },
    {
      title: "Meet Our Partner",
      description: "Our partner will contact you to arrange a face-to-face meeting at a convenient time.",
      icon: <Handshake size={50} className=" text-6xl text-primary mx-auto mb-4" />,
    },
    {
      title: "Get Price & Instant Payment",
      description:
        "Our expert team will review your device, provide you with a price quote, and schedule a payment meeting.",
      icon: <HandCoins size={50} className=" text-5xl text-primary  mx-auto mb-4" />,
    },
    {
      title: "7-Day Decision",
      description: "You'll have 7 days to decide whether to accept the offer and complete the sale.",
      icon: <Calendar size={50} className=" text-5xl text-primary mx-auto mb-4" />,
    },
  ];
  return (
    <section className="bg-primary/5 rounded-md py-14">
      <div className={root_container}>
        {/* <p className="text-xl md:text-2xl  font-bold font-heading  ">How IPM Works</p> */}
        <div>
          <h2 className="text-xl md:text-2xl px-5 md:px-0  font-bold mb-1">How IPM Works</h2>
          <p className="text-xs md:text-sm font-bold text-primary font-heading">Sell Your Apple Device with Us</p>
        </div>
        <div className="grid grid-cols-1 p-5 sm:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          {workingData.map((item, index) => (
            <div key={item.title} className="bg-white p-6 rounded-md  relative overflow-hidden">
              {/* <p className="absolute left-[8px] -top-11 bg-opacity-70 font-bold h-24 w-9 py-4 flex justify-center items-end rounded-full  text-black shadow-lg border">
                {index + 1}
              </p> */}
              {item.icon}
              <h3 className="font-semibold text-base md:text-lg text-gray-700 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
