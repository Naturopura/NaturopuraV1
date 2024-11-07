import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  // const router = useRouter();
  return (
    <>
      <div className="ml-[610px] mt-[300px]">
        <ConnectButton />
      </div>
      <button className="mt-10 bg-green-600 ml-[650px] block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        <Link href="/signup">Sign Up</Link>
      </button>
    </>
  );
};

export default Login;
