"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAppSelector } from "@/app/redux";

interface DecodedUser extends JwtPayload {
  role?: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode; // Define children prop type
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [decodedUser, setDecodedUser] = useState<DecodedUser | null>(null);
  const router = useRouter();
  const isAdmin = useAppSelector((state) => state.admin);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = jwtDecode<DecodedUser>(token);
      setDecodedUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [isAdmin]);

  return <>{children}</>;
};

export default ProtectedRoute;
