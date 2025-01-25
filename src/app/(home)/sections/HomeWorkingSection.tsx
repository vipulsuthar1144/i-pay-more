"use client";

import { Calendar, HandCoins, Handshake, PhoneIcon } from "lucide-react";

export default function HomeWorkingSection() {
  const workingData = [
    {
      title: "Submit Your Device",
      description: "Fill out a simple form with details about your Apple device-model, condition, and specifications.",
      icon: <PhoneIcon className="text-blue-500 text-5xl  mx-auto mb-4" />,
    },
    {
      title: "Meet Our Partner",
      description: "Our partner will contact you to arrange a face-to-face meeting at a convenient time.",
      icon: <Handshake className="text-blue-500 text-6xl   mx-auto mb-4" />,
    },
    {
      title: "Get Price & Instant Payment",
      description:
        "Our expert team will review your device, provide you with a price quote, and schedule a payment meeting.",
      icon: <HandCoins className="text-blue-500 text-5xl  mx-auto mb-4" />,
    },
    {
      title: "7-Day Decision",
      description: "You'll have 7 days to decide whether to accept the offer and complete the sale.",
      icon: <Calendar className="text-blue-500 text-5xl mx-auto mb-4" />,
    },
  ];
  return (
    <section className="bg-blue-50 py-14 ">
      <div className="container m-auto space-y-5">
        <p className="text-3xl font-semibold font-heading ">How IPM Works</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {workingData.map((item, index) => (
            <div key={item.title} className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
              <p className="absolute left-[8px] -top-11 bg-opacity-70 font-bold h-24 w-9 py-4 flex justify-center items-end rounded-full  text-black shadow-lg border">
                {index + 1}
              </p>
              {item.icon}
              <h3 className="font-semibold text-gray-700 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
