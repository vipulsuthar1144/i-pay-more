import { root_container } from "@/app/Providers";
import Image from "next/image";

const AppDownload = () => {
  return (
    <section
      className={` container mx-auto max-w-7xl bg-primary/10  rounded-xl mt-10 px-6 pt-6 md:pt-10 md:px-10 flex flex-col md:flex-row items-center justify-center gap-6`}
    >
      {/* Left Content */}
      <div>
        <h2 className="text-xl md:text-2xl  font-bold mb-2">Download the App</h2>
        <p className="text-xs sm:text-sm md:text-base">
          Sell your old phone | Buy top-quality refurbished phones | Get your phone repaired
        </p>

        {/* App Store Buttons */}
        <div className="flex gap-4 mt-10">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://s3n.cashify.in/cashify/web/images/landing/svgs/google-play.svg"
              alt="Google Play"
              width={130}
              height={40}
            />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://s3n.cashify.in/cashify/web/images/landing/svgs/apple-store.svg"
              alt="App Store"
              width={130}
              height={40}
            />
          </a>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="relative w-full md:w-[500px]">
        <Image
          src="https://s3no.cashify.in/estore/0f23d2860f77401db5d650d9e4e06344.webp?p=default&s=lg"
          alt="App Preview"
          width={500}
          height={400}
        />
      </div>
    </section>
  );
};

export default AppDownload;
