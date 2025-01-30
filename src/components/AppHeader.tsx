"use client";

import { useEffect, useState } from "react";
import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { useAppDispatch } from "@/store";
import { toggleLoginDialogState } from "@/store/slices/auth.slice";
import { appLogo } from "@assets/images/home";
import { LocalStorageKeys } from "@lib/constants";
import Image from "next/image";
import Link from "next/link";
import { root_container } from "@/app/Providers";

const Header = () => {
  const dispatch = useAppDispatch();
  const [accessToken, __, removeAccessToken] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoginLogout = () => {
    if (accessToken && typeof window !== "undefined") {
      removeAccessToken();
      localStorage.clear();
    } else {
      dispatch(toggleLoginDialogState());
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40 px-5 md:px-0">
      <div className={`${root_container}   px-5 sm:px-0 py-3 flex items-center justify-between`}>
        <div>
          <Link href="/">
            <Image src={appLogo} alt={"App Logo"} width={50} height={50} />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isClient && (
            <button
              onClick={handleLoginLogout}
              className="bg-black text-white py-2 px-6 rounded-lg flex items-center justify-center shadow-md hover:bg-gray-800 transition duration-300"
            >
              {accessToken ? "Logout" : "Login"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
