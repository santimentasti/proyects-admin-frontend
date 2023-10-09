import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuthentication = (WrappedComponent:any) => {
  return () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      if (!isLoggedIn) {
        router.push("/auth/login");
      }
    }, []);

    return isLoggedIn ? <WrappedComponent /> : null;
  };
};

export default withAuthentication;
