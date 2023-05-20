/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAuth } from "yazz/context/AuthContext";
import { GetSubCollection, getAppearance, getUser } from "yazz/utils/helpers";
import PreviewButtonLink from "./PreviewButtonLink";
import PreviewHeadline from "./PreviewHeadline";
import { DashOutlined } from "@ant-design/icons";
import { useAppContext } from "yazz/context/AppContext";
import { PARAMS } from "yazz/constants/constants";

export default function PreviewWeb() {
  const { dispatch } = useAppContext();
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
          className={`screen`}
          style={{
            backgroundColor: appearance?.data().background_color,
            color: appearance?.data().font_color,
            fontFamily: `'${appearance?.data().font_family}', sans-serif`,
          }}
        >
          <nav className="backdrop-blur-md border rounded-full py-1 px-2 left-40 right-40 fixed bg-[#ffffff4d]">
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
            <h3 className="font-semibold text-[.8rem] mt-3">
              {user.data().profile_title}
            </h3>
            <small className="text-[9px]">{user.data().bio}</small>
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
