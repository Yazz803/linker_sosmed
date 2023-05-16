/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAuth } from "yazz/context/AuthContext";
import GetCollection from "yazz/pages/utils/helpers";

export default function PreviewWeb() {
  const { currentUser } = useAuth();
  const dataUsers = GetCollection("users");
  return (
    <div className="smartphone">
      <div className="screen">
        {dataUsers.map((doc) => {
          if (doc.data().uid == currentUser.uid)
            return (
              <header className="flex flex-col justify-center items-center mt-10">
                <img
                  src={currentUser.photoURL}
                  className="w-14 rounded-full"
                  alt="Photo Profile"
                />
                <h3 className="font-semibold text-[.8rem] mt-3">
                  {doc.data().username}
                </h3>
                <small className="text-[9px] text-gray-400">
                  {doc.data().bio}
                </small>
              </header>
            );
        })}
      </div>
    </div>
  );
}
