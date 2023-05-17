/* eslint-disable @next/next/no-img-element */
import { Dropdown } from "antd";
import { useState } from "react";
import { auth } from "yazz/config/firebase";
import {
  ShareAltOutlined,
  PicCenterOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Logout from "../Logout";
import { useRouter } from "next/router";
import { getUser } from "yazz/utils/helpers";
import { useAuth } from "yazz/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);
  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "2121") {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  const items = [
    {
      label: (
        <div className="flex gap-2 pl-2 pr-24 py-4">
          <div>
            <img
              src={user?.data().photoURL}
              className="w-11 rounded-full cursor-pointer"
              alt="Photo Profile"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold m-0">{user?.data().name}</h1>
            <h1 className="text-l font-semibold">
              {process.env.NEXT_PUBLIC_SITE_URL}/{user?.data().username}
            </h1>
          </div>
        </div>
      ),
      key: "0",
    },
    {
      label: <Logout />,
      key: "1",
    },
  ];
  return (
    <div className="flex justify-between border-b-2 px-10 py-2 bg-white fixed top-0 right-0 left-0 z-50">
      <div className="flex items-center">
        <h3
          onClick={() => {
            router.push("/admin");
          }}
          className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all font-semibold px-4 py-2 rounded-md m-0"
        >
          <PicCenterOutlined /> Links
        </h3>
        <h3
          onClick={() => {
            router.push("/admin/appearance");
          }}
          className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all font-semibold px-4 py-2 rounded-md m-0"
        >
          <PieChartOutlined /> Appearance
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-all border font-semibold px-4 py-2 rounded-md m-0">
          <ShareAltOutlined /> Share
        </h3>
        <Dropdown
          menu={{ items: items, onClick: handleMenuClick }}
          trigger={["click"]}
          open={open}
          onOpenChange={handleOpenChange}
        >
          <img
            src={user?.data().photoURL}
            className="w-11 rounded-full cursor-pointer"
            alt="Photo Profile"
            onClick={() => setOpen(!open)}
          />
        </Dropdown>
      </div>
    </div>
  );
}
