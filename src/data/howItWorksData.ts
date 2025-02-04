import { iconRepairedPhone, iconScheduledRepair } from "@assets/images/repair";
import { iconGetMoney, iconPriceTags, iconScooter } from "@assets/images/sell";

export const dataHowItWorks = [
  {
    step: 1,
    serviceType: "SELL",
    title: "Check Price",
    description:
      "Select your device & tell us about its current condition, and our advanced AI tech will tailor make the perfect price for you.",
    icon: iconPriceTags,
  },
  {
    step: 2,
    serviceType: "SELL",
    title: "Schedule Pickup",
    description: "Book a free pickup from your home or work at a time slot that best suits your convenience.",
    icon: iconScooter,
  },
  {
    step: 3,
    serviceType: "SELL",
    title: "Get Paid",
    description:
      "Did we mention you get paid as soon as our executive picks up your device? It's instant payment all the way!",
    icon: iconGetMoney,
  },
  {
    step: 1,
    serviceType: "BUY",
    title: "Check Price",
    description:
      "Select device & check its price, and our advanced AI tech will tailor make the perfect price for you.",
    icon: iconPriceTags,
  },
  {
    step: 2,
    serviceType: "BUY",
    title: "Create Order",
    description:
      "Select device & check its price, and our advanced AI tech will tailor make the perfect price for you.",

    icon: iconScooter,
  },
  {
    step: 3,
    serviceType: "BUY",
    title: "Placed Order",
    description:
      "Did we mention you get paid as soon as our executive picks up your device? It's instant payment all the way!",
    icon: iconGetMoney,
  },
  {
    step: 1,
    serviceType: "REPAIR",
    title: "Check Price",
    description: "Select your device that needs to be repaired. Get best Pricing.",
    icon: iconPriceTags,
  },
  {
    step: 2,
    serviceType: "REPAIR",
    title: "Schedule Service",
    description: "Book a free technician visit at your home or work at a time slot that best suits your convenience.",
    icon: iconScheduledRepair,
  },
  {
    step: 3,
    serviceType: "REPAIR",
    title: "Get Device Repaired",
    description: "Our super-skilled technician will be there and make it as good as new.",
    icon: iconRepairedPhone,
  },
];
