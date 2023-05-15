/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAuth } from "yazz/context/AuthContext";

export default function PreviewWeb() {
  const { currentUser } = useAuth();
  return (
    <div className="smartphone">
      <div className="screen">
        <header className="flex flex-col justify-center items-center mt-10">
          <img
            src={currentUser.photoURL}
            className="w-14 rounded-full"
            alt="Photo Profile"
          />
          <h3 className="font-semibold text-[.8rem] mt-3">Yazz803</h3>
          <small className="text-[9px] text-gray-400">Ini adalah bio</small>
        </header>
      </div>
    </div>
  );
}
