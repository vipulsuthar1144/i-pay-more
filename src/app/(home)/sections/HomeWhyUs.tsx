import { root_container } from "@/app/Providers";
import { Tag, Banknote, Truck, Database, FileText, Hand, IndianRupeeIcon } from "lucide-react";

const features = [
  { icon: Tag, title: "Best Prices", description: "Objective AI-based pricing" },
  {
    icon: IndianRupeeIcon,
    title: "Instant Payment",
    description: "Instant Money Transfer in your preferred mode at time of pick up or store drop off",
  },
  { icon: Truck, title: "Free Doorstep Pickup", description: "No fees for pickup across 1500 cities across India" },
  { icon: Database, title: "Factory Grade Data Wipe", description: "100% Safe and Data Security Guaranteed" },
  { icon: FileText, title: "Valid Purchase Invoice", description: "Genuine Bill of Sale" },
  { icon: Hand, title: "Simple & Convenient", description: "Check price, schedule pickup & get paid" },
];

export default function WhyUs() {
  return (
    <section className="bg-primary/5 py-10 rounded-lg">
      <div className={`${root_container}  px-5 sm:px-0 `}>
        <div>
          <h2 className="text-xl md:text-2xl  font-bold mb-1">Why IPM</h2>
          <p className="text-xs md:text-sm font-bold text-primary font-heading">Sell Your Apple Device with Us</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-5  p-2 md:p-5"
            >
              <div className="min-w-14">
                <Icon size={50} className="text-primary w-10" />
              </div>
              <div className="text-left space-y-2">
                <h3 className="font-semibold text-base md:text-lg">{title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
