/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAuth } from "yazz/context/AuthContext";
import { GetSubCollection, getAppearance, getUser } from "yazz/utils/helpers";
import PreviewButtonLink from "./PreviewButtonLink";
import PreviewHeadline from "./PreviewHeadline";

export default function PreviewWeb() {
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser.uid);
  const appearance = getAppearance(user?.id);
  const links = GetSubCollection(`users/${user?.id}/links`);

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
          <header className="text-center flex flex-col justify-center items-center mt-8">
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
