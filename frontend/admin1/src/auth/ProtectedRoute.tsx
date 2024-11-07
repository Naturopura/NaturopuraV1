"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode"; // Importing jwt-decode
import { useAppSelector } from "@/store"; // Adjust based on your store

interface DecodedUser extends JwtPayload {
  role?: string;
  id: string; // Assuming role is part of the JWT payload
}

interface ProtectedRouteProps {
  children: React.ReactNode; // Define children prop type
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const adminState = useAppSelector((state) => state.rootReducer.auth.admin); // Adjust based on your actual state

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        // Decode the JWT token
        const decodedToken = jwtDecode<DecodedUser>(token);
        console.log(decodedToken, "here is data");
        const farmerId = decodedToken.id;
        const role = decodedToken.role; // This is the MongoDB ID from the token

        console.log("MongoDB Farmer ID:", farmerId);
        console.log("MongoDB Farmer role:", role);

        // Check if the token has expired (you can do this using the 'exp' field in the token)
        if (decodedToken.exp && Date.now() / 1000 > decodedToken.exp) {
          // If the token has expired, redirect to login
          router.push("/login");
          return;
        }

        // You can also check the role in the decoded token (if applicable)
        if (decodedToken.role === "admin") {
          // If the user is an admin, redirect to the home page or admin page
          router.push("/");
        } else if (decodedToken.role === "farmer") {
          router.push("/farmer");
        } else {
          // Non-admins are sent to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Error decoding token", error);
        // In case the token is invalid or cannot be decoded, redirect to login
        router.push("/login");
      }
    } else {
      // If no token is found, redirect to login
      router.push("/login");
    }
  }, [adminState]);

  return <>{children}</>;
}
