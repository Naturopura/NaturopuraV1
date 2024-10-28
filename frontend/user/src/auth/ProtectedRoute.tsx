"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
// import { useAppSelector } from "@/app/redux";
// import { useSelector } from "react-redux";
// import { adminReducerInitialState } from "@/store/adminSlice";
import { useAppSelector } from "@/store";

interface DecodedUser extends JwtPayload {
  role?: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode; // Define children prop type
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isUser = useAppSelector((state) => state.auth.user); // Adjust based on your actual state

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // const decodedToken = jwtDecode<DecodedUser>(token);

      if (isUser) {
        // Redirect admins to the home page
        router.push("/");
      } else {
        // Non-admins are sent to login
        router.push("/login");
      }
    } else {
      // If no token, redirect to login
      router.push("/login");
    }
  }, [isUser]);

  return <>{children}</>;
}
