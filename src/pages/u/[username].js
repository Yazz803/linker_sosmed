/* eslint-disable @next/next/no-img-element */
import { DashOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React from "react";
import ModalShareButtonUser from "yazz/components/Admin/ModalShareButtonUser";
import UserButtonLink from "yazz/components/Admin/UserButtonLink";
import UserHeadline from "yazz/components/Admin/UserHeadline";
import Metadata from "yazz/components/Metadata";
import { PARAMS } from "yazz/constants/constants";
import { useAppContext } from "yazz/context/AppContext";
import { GetSubCollection, getUser } from "yazz/utils/helpers";

export default function UserWebPage() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { username } = router.query;
  const user = getUser("username", username);
  const appearance = GetSubCollection(
    `users/${user?.id}/appearance_settings`
  )[0];
  const links = GetSubCollection(`users/${user?.id}/links`);

  const handleOpenModalShare = () => {
    dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON_USER, value: true });
  };
  return (
    <>
      {user && (
        <>
          <Metadata user={user} />
          {appearance && (
            <>
              <div
                style={{
                  // backgroundImage:
                  //   user.data().uid == "wFwx3x899eYIV8asYL81wFjhzqh1"
                  //     ? "url('/images/loadingscreen.gif')"
                  //     : "",
                  backgroundImage:
                    user.data().uid == "wFwx3x899eYIV8asYL81wFjhzqh1"
                      ? "url('https://i0.wp.com/c.tenor.com/Kbk7TGpDvhYAAAAC/anime-live-wallpaper.gif')"
                      : "",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: appearance?.data().background_color,
                }}
                className="h-screen overflow-y-scroll p-5 lg:px-96 lg:py-10"
              >
                <ModalShareButtonUser
                  show={state.isShowModalShareButtonUser}
                  user={user}
                />
                <nav className="backdrop-blur-md border rounded-full py-2 lg:mx-96 px-4 fixed lg:left-0 lg:right-0 left-5 right-5 bg-[#ffffff4d]">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.data().photoURL}
                        // src="/images/loadingscreen.gif"
                        className="w-10 rounded-full"
                        alt="Photo Profile"
                      />
                    </div>
                    <h3
                      className="font-semibold text-xl m-0"
                      style={{
                        color: appearance.data().font_color,
                      }}
                    >
                      {user.data().profile_title}
                    </h3>
                    <div className="flex gap-2">
                      <div
                        onClick={handleOpenModalShare}
                        className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-full bg-gray-700"
                      >
                        <DashOutlined className="text-white" />
                      </div>
                      {/* <button className="bg-gray-200 hover:bg-gray-300 transition-all rounded-full px-3 py-1">
                        <a
                          href={`https://twitter.com/intent/tweet?text=Check%20out%20${
                            user.data().username
                          }%20on%20Yazz%20https://yazz.vercel.app/u/${
                            user.data().username
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <TwitterOutlined />
                        </a>
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 transition-all rounded-full px-3 py-1">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=https://yazz.vercel.app/u/${
                            user.data().username
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FacebookOutlined />
                        </a>
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 transition-all rounded-full px-3 py-1">
                        <a
                          href={`https://www.linkedin.com/shareArticle?mini=true&url=https://yazz.vercel.app/u/${
                            user.data().username
                          }&title=Check%20out%20${
                            user.data().username
                          }%20on%20Yazz&summary=Check%20out%20${
                            user.data().username
                          }%20on%20Yazz&source=https://yazz.vercel.app/u/${
                            user.data().username
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <LinkedinOutlined />
                        </a>
                      </button> */}
                    </div>
                  </div>
                </nav>
                <header className="flex flex-col justify-center items-center pt-20">
                  <img
                    src={user.data().photoURL}
                    className="w-24 rounded-full"
                    alt="Photo Profile"
                  />
                  <h3
                    className="font-semibold text-2xl mt-3"
                    style={{
                      color: appearance.data().font_color,
                    }}
                  >
                    {user.data().profile_title}
                  </h3>
                  <small
                    className="text-base font-medium"
                    style={{
                      color: appearance.data().font_color,
                    }}
                  >
                    {user.data().bio}
                  </small>
                </header>
                {links.map((document, i) => {
                  if (document.data().is_active) {
                    if (document.data().type == "link") {
                      return (
                        <UserButtonLink
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
                        <UserHeadline
                          document={document}
                          appearance={appearance}
                          key={i}
                        />
                      );
                    }
                  }
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
