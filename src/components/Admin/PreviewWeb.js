/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAuth } from "yazz/context/AuthContext";
import { GetSubCollection, getAppearance, getUser } from "yazz/utils/helpers";
import PreviewButtonLink from "./PreviewButtonLink";
import PreviewHeadline from "./PreviewHeadline";
import { DashOutlined } from "@ant-design/icons";
import { useAppContext } from "yazz/context/AppContext";
import { PARAMS } from "yazz/constants/constants";
import { Spin } from "antd";

export default function PreviewWeb() {
  const { state, dispatch } = useAppContext();
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser.uid);
  const appearance = getAppearance(user?.id);
  const links = GetSubCollection(`users/${user?.id}/links`, {
    orderBy: ["list_number", "asc"],
  });

  const handleOpenModalShare = () => {
    dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON_USER, value: true });
  };

  return (
    <div className="smartphone shadow-lg shadow-gray-500/100">
      {user && (
        <div
          className={`screen relative`}
          style={{
            backgroundImage: `url("${appearance?.data().background_image}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: appearance?.data().background_color,
            color: appearance?.data().font_color,
            fontFamily: `'${appearance?.data().font_family}', sans-serif`,
          }}
        >
          <Spin
            spinning={state.isLoadingPreview}
            className="absolute z-50 bg-[#00000069] p-1 rounded-full backdrop-blur-sm top-1 left-1"
          />
          <nav className="backdrop-blur-md border rounded-full py-1 px-2 fixed m-auto w-40 bg-[#ffffff4d] z-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={user.data().photoURL}
                  // src="/images/loadingscreen.gif"
                  className="w-5 rounded-full"
                  alt=""
                />
              </div>
              <h3
                className="font-semibold text-[11px] m-0"
                style={{
                  color: appearance?.data().font_color,
                }}
              >
                {user.data().profile_title}
              </h3>
              <div className="flex gap-2">
                <div
                  onClick={handleOpenModalShare}
                  className="cursor-pointer flex items-center justify-center h-5 w-5 rounded-full bg-gray-700"
                >
                  <DashOutlined className="text-white" />
                </div>
              </div>
            </div>
          </nav>
          <header className="text-center flex flex-col justify-center items-center mt-12">
            <img
              src={user.data().photoURL}
              // src="/images/loadingscreen.gif"
              className="w-14 rounded-full"
              alt="Photo Profile"
            />
            <h3
              className="font-semibold backdrop-blur-sm px-1 py-[2px] rounded-sm text-[.8rem] mt-3"
              style={{
                backgroundColor: `${appearance?.data().button_color}100`,
                color: appearance?.data().font_color,
              }}
            >
              {user.data().profile_title}
            </h3>
            <small
              className="text-[9px] backdrop-blur-sm px-1 py-[2px] rounded-sm"
              style={{
                backgroundColor: `${appearance?.data().button_color}100`,
                color: appearance?.data().font_color,
              }}
            >
              {user.data().bio}
            </small>
          </header>
          <section className="mt-4">
            {links.map((document, i) => {
              if (document.data().is_active) {
                if (document.data().type == "link") {
                  return (
                    <PreviewButtonLink
                      document={document}
                      appearance={appearance}
                      links={links}
                      index={i}
                      key={i}
                    />
                  );
                }

                if (document.data().type == "header") {
                  return (
                    <PreviewHeadline
                      document={document}
                      appearance={appearance}
                      key={i}
                    />
                  );
                }
              }
            })}
          </section>
        </div>
      )}
    </div>
  );
}
