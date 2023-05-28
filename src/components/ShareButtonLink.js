/* eslint-disable @next/next/no-img-element */
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

export default function ShareButtonLink({ children, icon, link }) {
  return (
    <Link href={link} target="_blank" className="hover:text-black">
      <div className="flex justify-between items-center mb-3 cursor-pointer rounded-sm transition-all hover:bg-gray-200 p-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold">{children}</span>
        </div>
        <ArrowRightOutlined />
      </div>
    </Link>
  );
}
