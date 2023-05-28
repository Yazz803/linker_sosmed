/* eslint-disable @next/next/no-img-element */
import {
  PicCenterOutlined,
  PieChartOutlined,
  PoweroffOutlined,
  PlusOutlined,
  EyeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import { getUser } from "yazz/utils/helpers";
import NavbarShareButton from "./NavbarShareButton";
import { auth } from "yazz/config/firebase";
import { GetCountVisitors } from "yazz/utils/getCountVisitors";
import { useAppContext } from "yazz/context/AppContext";
import { PARAMS } from "yazz/constants/constants";
export default function NavbarMobile() {
  const { dispatch } = useAppContext();
  const router = useRouter();
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);

  const handleLogout = () => {
    auth.signOut();
    router.push("/login");
  };
  return (
    <>
      <div className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 border-b border-gray-600">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <div className="logonanti font-bold text-2xl">Y</div>
          <div className="flex">
            <h3
              onClick={() => {
                dispatch({
                  type: PARAMS.SET_MODAL_HISTORY_VISITORS,
                  value: true,
                });
              }}
              className="cursor-pointer flex items-center gap-2 hover:bg-gray-600 transition-all font-semibold px-4 py-2 rounded-md m-0"
            >
              <UserSwitchOutlined /> Total Visitor : {GetCountVisitors()}
            </h3>
            <div className="w-28">
              <NavbarShareButton />
            </div>
          </div>
        </div>
        <div className="flex justify-around my-2">
          <div
            className="flex flex-col items-center gap-1"
            onClick={() => router.push("/admin")}
          >
            <PicCenterOutlined className="text-xl" />
            <span className="text-xs font-semibold">Links</span>
          </div>
          <div
            className="flex flex-col items-center gap-1"
            onClick={() => router.push("/admin/appearance")}
          >
            <PieChartOutlined className="text-xl" />
            <span className="text-xs font-semibold">Appearance</span>
          </div>
          <div
            className="flex flex-col items-center gap-1"
            onClick={() => {
              router.push("/admin/account");
            }}
          >
            <img
              src={user?.data().photoURL}
              className="rounded-full w-7"
              alt="Photo Profile"
            />
            <span className="text-xs font-semibold">More</span>
          </div>
        </div>
      </div>

      {/* <div
        onClick={() => {
          router.push(`/u/${user?.data().username}`);
        }}
        className="fixed font-bold px-4 py-2 rounded-lg shadow-xl shadow-gray-500/50 bottom-[100px] left-[24px] z-50 bg-white text-black border-2 border-gray-700"
      >
        <span className="flex items-center gap-2">
          Preview <EyeOutlined className="text-xl" />
        </span>
      </div> */}

      <FloatButton.Group
        trigger="click"
        // type="primary"
        style={{
          right: 24,
          bottom: 100,
        }}
        icon={<PlusOutlined className="text-white" />}
        className="font-bold"
      >
        <div
          className="relative mt-2"
          onClick={() => {
            router.push("/admin/account");
          }}
        >
          <p className="bg-white px-2 shadow-md rounded-full fixed right-20 mt-2">
            {user?.data().name}
          </p>
          <FloatButton
            icon={
              <img
                src={user?.data().photoURL}
                className="rounded-full scale-150"
                alt="Photo Profile"
              />
            }
          />
        </div>
        <div
          className="relative mt-2"
          onClick={() => {
            router.push(`/u/${user?.data().username}`);
          }}
        >
          <p className="bg-white px-2 shadow-md rounded-full fixed right-20 mt-2">
            Preview Web
          </p>
          <FloatButton icon={<EyeOutlined className="text-white" />} />
        </div>
        <div className="relative mt-2" onClick={handleLogout}>
          <p className="bg-white text-red-500 px-2 shadow-md rounded-full fixed right-20 mt-2">
            Logout
          </p>
          <FloatButton icon={<PoweroffOutlined className="text-white" />} />
        </div>
      </FloatButton.Group>
    </>
  );
}
