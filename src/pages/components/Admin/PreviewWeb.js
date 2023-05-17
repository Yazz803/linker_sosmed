/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAuth } from "yazz/context/AuthContext";
import { getAppearance, getUser } from "yazz/utils/helpers";

export default function PreviewWeb() {
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser.uid);
  const appearance = getAppearance(user?.id);

  return (
    <div className="smartphone">
      {user && (
        <div
          className={`screen`}
          style={{
            backgroundColor: appearance?.data().background_color,
            color: appearance?.data().font_color,
            fontFamily: `'${appearance?.data().font_family}', sans-serif`,
          }}
        >
          <header className="flex flex-col justify-center items-center mt-10">
            <img
              src={user.data().photoURL}
              className="w-14 rounded-full"
              alt="Photo Profile"
            />
            <h3 className="font-semibold text-[.8rem] mt-3">
              {user.data().profile_title}
            </h3>
            <small className="text-[9px]">{user.data().bio}</small>
          </header>
        </div>
      )}
    </div>
  );
}
