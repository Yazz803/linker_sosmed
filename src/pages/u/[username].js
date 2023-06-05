/* eslint-disable @next/next/no-img-element */
import { DashOutlined } from "@ant-design/icons";
import { serverTimestamp } from "firebase/firestore";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import ModalShareButtonUser from "yazz/components/Admin/ModalShareButtonUser";
import UserButtonLink from "yazz/components/Admin/UserButtonLink";
import UserHeadline from "yazz/components/Admin/UserHeadline";
import Metadata from "yazz/components/Metadata";
import ModalShareButtonLink from "yazz/components/Modal/ModalShareButtonLink";
import Watermark from "yazz/components/Watermark";
import api from "yazz/config/api";
import { PARAMS } from "yazz/constants/constants";
import { useAppContext } from "yazz/context/AppContext";
import GetCollection, {
  GetSubCollection,
  addDataDoc,
  getUser,
} from "yazz/utils/helpers";

export default function UserWebPage() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const { username } = router.query;
  const dataUsers = GetCollection("users");
  const user = getUser("username", username);
  const appearance = GetSubCollection(
    `users/${user?.id}/appearance_settings`
  )[0];
  const links = GetSubCollection(`users/${user?.id}/links`, {
    orderBy: ["list_number", "asc"],
  });
  const history_visitors = GetSubCollection(
    `users/${user?.id}/history_visitors`
  );

  const handleOpenModalShare = () => {
    dispatch({ type: PARAMS.SET_MODAL_SHARE_BUTTON_USER, value: true });
  };

  const incrementVisitors = (user) => {
    let isHaveBeenVisitor = JSON.parse(
      localStorage.getItem("have_been_visitor")
    );
    let dataUserBio = JSON.parse(localStorage.getItem("data_user_bio"));

    if (isHaveBeenVisitor == null || dataUserBio.username != username) {
      let dataVisitor = JSON.parse(localStorage.getItem("user_yazz_linker"));
      let foundVisitor = dataUsers.find(
        (doc) => doc.data().uid === dataVisitor?.uid
      );
      let visitor = {
        name: "Anonymous",
        profile_title: "Anonymous",
        photoURL: "/images/photo-profile.webp",
        createdAt: serverTimestamp(),
      };
      if (foundVisitor) {
        visitor = {
          id: foundVisitor.id,
          uid: foundVisitor.data().uid,
          name: foundVisitor.data().name,
          profile_title: foundVisitor.data().profile_title,
          username: foundVisitor.data().username,
          photoURL: foundVisitor.data().photoURL,
          createdAt: serverTimestamp(),
        };
      }
      addDataDoc(`users/${user.id}/history_visitors`, visitor);
      let dataUserParam = {
        name: user.data().name,
        profile_title: user.data().profile_title,
        username: user.data().username,
      };
      localStorage.setItem("have_been_visitor", JSON.stringify(true));
      localStorage.setItem("data_user_bio", JSON.stringify(dataUserParam));

      sendNotification(user, history_visitors);
    }
  };

  const sendNotification = (user, history_visitors) => {
    history_visitors = history_visitors.length + 1;
    if (history_visitors % 10 === 0) {
      api.sendNotification({
        to: user.data().fcmToken,
        notification: {
          title: "Yazz Linker",
          body: `${history_visitors} people have visited your profile`,
          image: user.data().photoURL,
        },
      });
    }
  };

  if (user?.exists && !_.isEmpty(history_visitors)) {
    incrementVisitors(user, history_visitors);
    // console.log(user);
  }

  return (
    <>
      {user && (
        <>
          <Metadata user={user} />
          {appearance && (
            <>
              <div
                style={{
                  backgroundImage: `url("${
                    appearance?.data().background_image
                  }")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: appearance?.data().background_color,
                }}
                className="h-screen overflow-y-scroll p-5 lg:px-80 lg:py-10"
              >
                <ModalShareButtonUser
                  show={state.isShowModalShareButtonUser}
                  user={user}
                />
                <ModalShareButtonLink show={state.isShowModalShareButtonLink} />
                <nav className="backdrop-blur-md border rounded-full z-50 py-2 lg:mx-80 px-4 fixed lg:-left-10 lg:-right-6 left-5 right-5 bg-[#ffffff4d]">
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
                    className="font-semibold px-3 py-1 text-2xl mt-3 mb-0 backdrop-blur-sm rounded-md"
                    style={{
                      backgroundColor: `${appearance.data().button_color}100`,
                      color: appearance.data().font_color,
                    }}
                  >
                    {user.data().profile_title}
                  </h3>
                  <small
                    className="text-base font-medium px-2 py-1 backdrop-blur-sm rounded-md"
                    style={{
                      backgroundColor: `${appearance.data().button_color}100`,
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
                        <>
                          <UserButtonLink
                            document={document}
                            appearance={appearance}
                            links={links}
                            user={user}
                            index={i}
                            key={i}
                          />
                        </>
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
                <div className="mt-12 lg:w-[60%] m-auto">
                  <Watermark appearance={appearance} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
