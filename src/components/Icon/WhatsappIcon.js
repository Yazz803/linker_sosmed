/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function WhatsappIcon({ size = 30 }) {
  return (
    <img
      width={size}
      height={size}
      src={`https://img.icons8.com/officel/${size}/whatsapp.png`}
      alt="whatsapp"
    />
  );
}
