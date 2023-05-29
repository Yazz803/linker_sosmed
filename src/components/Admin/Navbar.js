/* eslint-disable @next/next/no-img-element */
import { Dropdown, Tour } from "antd";
import { useRef, useState } from "react";
import {
  EyeOutlined,
  PicCenterOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import LogoutButton from "../LogoutButton";
import { useRouter } from "next/router";
import { getUser } from "yazz/utils/helpers";
import { useAuth } from "yazz/context/AuthContext";
import NavbarShareButton from "./NavbarShareButton";
import Link from "next/link";
import { GetCountVisitors } from "yazz/utils/getCountVisitors";
import { PARAMS } from "yazz/constants/constants";
import { useAppContext } from "yazz/context/AppContext";

export default function Navbar() {
  const refAppearance = useRef(null);
  const refTotalVisitors = useRef(null);
  const refVisitYourPage = useRef(null);
  const { state, dispatch } = useAppContext();
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

  const handleOpenTour = () => {
    dispatch({ type: PARAMS.SET_MODAL_TOUR_NAVBAR, value: true });
  };

  const handleCloseTour = () => {
    dispatch({ type: PARAMS.SET_MODAL_TOUR_NAVBAR, value: false });
  };

  const items = [
    {
      label: (
        <div
          className="flex gap-2 pl-2 pr-24 py-4"
          onClick={() => {
            router.push("/admin/account");
          }}
        >
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
      key: "1",
      type: "group",
      label: <span className="pl-2 font-semibold text-base">Account</span>,
      children: [
        {
          key: "1-1",
          label: (
            <div
              className="flex gap-2 items-center mb-3"
              onClick={() => router.push("/admin/account")}
            >
              <UserOutlined /> My Account
            </div>
          ),
        },
        {
          key: "1-2",
          label: <LogoutButton />,
        },
      ],
    },
  ];

  const stepsTour = [
    {
      title: "Appearance",
      description:
        "Kalian bisa mengubah tampilan website kalian mulai dari photo profile, background image, button color, font color, dll.",
      target: () => refAppearance.current,
    },
    {
      title: "Total Visitors",
      description:
        "Click untuk lihat siapa saja yang mengunjungi website kalian.",
      target: () => refTotalVisitors.current,
    },
    {
      title: "Visit Your Page",
      description: "Lihat tampilan website dengan click button diatas.",
      target: () => refVisitYourPage.current,
    },
  ];
  return (
    <div className="flex justify-between border-b-2 px-10 py-2 bg-gray-800 text-white fixed top-0 right-0 left-0 z-50">
      <div className="flex items-center">
        <h3
          onClick={() => {
            router.push("/admin");
          }}
          className="cursor-pointer flex items-center gap-2 hover:bg-gray-600 transition-all font-semibold px-4 py-2 rounded-md m-0"
        >
          <PicCenterOutlined /> Links
        </h3>
        <h3
          ref={refAppearance}
          onClick={() => {
            router.push("/admin/appearance");
          }}
          className="cursor-pointer flex items-center gap-2 hover:bg-gray-600 transition-all font-semibold px-4 py-2 rounded-md m-0"
        >
          <PieChartOutlined /> Appearance
        </h3>
        <h3
          ref={refTotalVisitors}
          onClick={() => {
            dispatch({ type: PARAMS.SET_MODAL_HISTORY_VISITORS, value: true });
          }}
          className="cursor-pointer flex items-center gap-2 hover:bg-gray-600 transition-all font-semibold px-4 py-2 rounded-md m-0"
        >
          <UserSwitchOutlined /> Total Visitor : {GetCountVisitors()}
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <NavbarShareButton />
        <Link
          ref={refVisitYourPage}
          href={`/u/${user?.data().username}`}
          target="_blank"
          className="cursor-pointer flex justify-center items-center gap-2 hover:bg-gray-700 transition-all border font-semibold px-4 py-2 rounded-md m-0"
        >
          <EyeOutlined /> Visit your page
        </Link>
        <Dropdown
          menu={{ items: items, onClick: handleMenuClick }}
          trigger={["click"]}
          arrow
          open={open}
          onOpenChange={handleOpenChange}
          className="shadow-xl"
        >
          <img
            src={user?.data().photoURL}
            className="w-11 rounded-full cursor-pointer"
            alt="Photo Profile"
            onClick={() => setOpen(!open)}
          />
        </Dropdown>
        <Tour
          open={state.isShowModalTourNavbar}
          onClose={() => handleCloseTour()}
          onFinish={() => {
            console.log("beres kang");
          }}
          steps={stepsTour}
        />
        <button
          onClick={handleOpenTour}
          className="fixed bottom-14 right-10 w-10 h-10 bg-black rounded-full hover:bg-white transition-all"
        >
          <QuestionCircleOutlined className="text-2xl hover:text-black transition-all" />
        </button>
      </div>
    </div>
  );
}
