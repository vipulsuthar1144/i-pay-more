"use client";

import AppLoader from "@components/AppLoader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/policies/privacy");
  }, []);

  return <AppLoader />;
};

export default page;
