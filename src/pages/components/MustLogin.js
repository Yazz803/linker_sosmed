import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "yazz/config/firebase";

export default function MustLogin(props) {
  const [isLogin, setIsLogin] = useState(false);
  setInterval(() => {
    setIsLogin(true);
  }, 2000);
  return (
    <div
      className={`${
        !isLogin ? "hidden" : ""
      } bg-gray-800 h-screen flex items-center justify-center flex-col login__page`}
    >
      <div className="md:flex flex-col justify-center items-center shadow-sm p-6 rounded-md bg-[#ffffff67] backdrop-blur-sm">
        <div className="md:flex items-center justify-center text-black">
          <h1 className="text-center text-9xl font-bold">
            403 |<span className="md:hidden">|</span>
          </h1>
          <h1 className="text-6xl font-bold uppercase"> forbidden</h1>
        </div>
        <p className="text-2xl text-black text-center">Login Dulu ya...</p>
        <p className="text-2xl text-black text-center">
          Kamu akan diarahkan ke Login Page dalam {props.countdown} detik
        </p>
      </div>
    </div>
  );
}
