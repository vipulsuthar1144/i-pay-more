"use client";

import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { useAppDispatch } from "@/store";
import { toggleLoginDialogState } from "@/store/slices/auth.slice";
import { appLogo } from "@assets/images/home";
import { LocalStorageKeys } from "@lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { AppNavBar } from "./AppNavBar";
import AppSidebar from "./AppSidebar";
import Profile from "./sections/Profile";

const Header = () => {
  const dispatch = useAppDispatch();
  const [accessToken, __, removeAccessToken] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN, "");
  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoginLogout = () => {
    if (isClient && accessToken && typeof window !== "undefined") {
      removeAccessToken();
      localStorage.clear();
    } else {
      dispatch(toggleLoginDialogState());
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 left-0 z-40">
      <div className={` container m-auto max-w-7xl  p-5 md:px-10 lg:px-0 py-3 flex items-center justify-between`}>
        <div>
          <Link href="/">
            <Image src={appLogo} alt={"App Logo"} width={50} height={50} />
          </Link>
        </div>

        <div className="flex items-center">
          <AppNavBar />
          <AppSidebar accessToken={accessToken} onLoginLogoutClick={handleLoginLogout} />
          {accessToken && <Profile accessToken={accessToken} onLoginLogoutClick={handleLoginLogout} />}

          {!accessToken && (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleLoginLogout}
                className="bg-primary/70 text-white py-2 px-6 rounded-lg flex items-center justify-center shadow-md hover:bg-primary transition duration-300"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
