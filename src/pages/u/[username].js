/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import { GetSubCollection, getUser } from "yazz/utils/helpers";

export default function UserWebPage() {
  const router = useRouter();
  const { username } = router.query;
  const user = getUser("username", username);
  const appearance = GetSubCollection(
    `users/${user?.id}/appearance_settings`
  )[0];
  return (
    <>
      <header className="flex flex-col justify-center items-center mt-10">
        <p>{appearance?.data()?.font_family}</p>
        <img
          src={user?.data().photoURL}
          className="w-14 rounded-full"
          alt="Photo Profile"
        />
        <h3 className="font-semibold text-[.8rem] mt-3">
          {user?.data().username}
        </h3>
        <small className="text-[9px] text-gray-400">{user?.data().bio}</small>
      </header>
    </>
  );
}
