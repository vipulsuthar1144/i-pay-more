import { root_container } from "@/app/Providers";
import { footerData } from "@/data/footerData";
import { appLogo } from "@assets/images/home";
import Image from "next/image";
import Link from "next/link";

const AppFooter = () => {
  const socialMediaLinks = [
    {
      href: "#",
      icon: (
        <svg className="size-7" fill="#00a2e4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Facebook",
    },
    {
      href: "#",
      icon: (
        <svg className="size-7" fill="#00a2e4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Instagram",
    },
    {
      href: "#",
      icon: (
        <svg className="size-7" fill="#00a2e4" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      label: "Twitter",
    },
    // {
    //   href: "#",
    //   icon: (
    //     <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    //       <path
    //         fillRule="evenodd"
    //         d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   ),
    //   label: "Github",
    // },
    {
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-7" viewBox="0 0 24 24" fill="#00a2e4">
          <path d="M23.498 6.186c-.275-1.037-1.083-1.85-2.13-2.132C19.26 3.5 12 3.5 12 3.5s-7.26 0-9.368.554c-1.047.282-1.855 1.095-2.13 2.132C0 8.315 0 12 0 12s0 3.685.502 5.814c.275 1.037 1.083 1.85 2.13 2.132C4.74 20.5 12 20.5 12 20.5s7.26 0 9.368-.554c1.047-.282 1.855-1.095 2.13-2.132C24 15.685 24 12 24 12s0-3.685-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      label: "Youtube",
    },
  ];
  return (
    <>
      <footer className="bg-white p-5 md:px-10 lg:px-0 py-10">
        <div className={root_container}>
          <div className={`grid grid-cols-2 gap-4 lg:grid-cols-6`}>
            <div className="col-span-2 my-2">
              <div className="flex items-center gap-5">
                <Link href="/" className="flex items-center">
                  {/* <Apple className="h-8 w-8 text-gray-900" /> */}
                  <Image src={appLogo} alt={"App Logo"} width={90} height={90} />
                  {/* <span className="ml-2 text-xl font-bold text-gray-900">IPM</span> */}
                </Link>
                <p>
                  <span className="text-xs md:text-sm uppercase tracking-wide text-gray-500"> Call us </span>
                  <a
                    href="#"
                    className="block text-lg sm:text-xl md:text-2xl lg-text-3xl font-medium text-gray-900 hover:underline"
                  >
                    9876543210
                  </a>
                </p>
              </div>

              {/* <ul className="mt-8 space-y-1 text-xs md:text-sm text-gray-700">
                <li>Monday to Friday: 10am - 5pm</li>
                <li>Weekend: 10am - 3pm</li>
              </ul> */}

              <ul className="mt-8 flex gap-6">
                {socialMediaLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:underline"
                    >
                      <span className="sr-only">{item.label}</span>
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-2">
              <p className="font-bold text-gray-900 text-base md:text-lg">{footerData.services.title}</p>
              <ul className="mt-4 space-y-4 text-xs md:text-sm">
                {footerData.services.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-700 transition hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="my-2">
              <p className="font-bold text-gray-900 text-base md:text-lg">{footerData?.company?.title}</p>
              <ul className="mt-4 space-y-4 text-xs md:text-sm">
                {footerData?.company?.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-700 transition hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
            <div className="my-2">
              <p className="font-bold text-gray-900 text-base md:text-lg">{footerData.sellDevice.title}</p>
              <ul className="mt-4 space-y-4 text-xs md:text-sm">
                {footerData.sellDevice.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-700 transition hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-2">
              <p className="font-bold text-gray-900 text-base md:text-lg">{footerData.buyDevice.title}</p>
              <ul className="mt-4 space-y-4 text-xs md:text-sm">
                {footerData.buyDevice.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-700 transition hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-2">
              <p className="font-bold text-gray-900 text-base md:text-lg">{footerData.helpSupport.title}</p>
              <ul className="mt-4 space-y-4 text-xs md:text-sm">
                {footerData.helpSupport.items.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-700 transition hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gray-400 my-10" />
        <div className={root_container}>
          <div className="md:flex md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs ">
              {footerData.moreInfo.items.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-700 transition hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs md:text-sm text-gray-700 sm:mt-0">
              &copy; {new Date().getFullYear()}. iPayMore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppFooter;
