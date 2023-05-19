/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function LoadingPage() {
  return (
    <div className="h-screen flex justify-center items-center costum__bg__image">
      <img
        src="/images/loadingscreen2.gif"
        className="shadow-lg w-1/2 lg:w-1/4 overflow-hidden shadow-gray-500/100"
        alt="Loading"
      />
    </div>
  );
}
