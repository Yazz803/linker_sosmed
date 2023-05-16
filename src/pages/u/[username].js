/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import GetCollection, { GetSubCollection } from "yazz/utils/helpers";

export default function UserWebPage() {
  const router = useRouter();
  const { username } = router.query;
  const dataUsers = GetCollection("users");
  let dataUser = dataUsers.find(
    (document) => document.data().username == username
  );
  // console.log("bang", dataUser);
  const appSetting = GetSubCollection(`users/${dataUser?.id}/app_settings`)[0];
  // console.log("links", links);
  return (
    <>
      <header className="flex flex-col justify-center items-center mt-10">
        {/* {links.map((document, i) => ( */}
        <>
          <p>{appSetting?.data()?.font_family}</p>
        </>
        {/* ))} */}
        <img
          src={dataUser?.data().photoURL}
          className="w-14 rounded-full"
          alt="Photo Profile"
        />
        <h3 className="font-semibold text-[.8rem] mt-3">
          {dataUser?.data().username}
        </h3>
        <small className="text-[9px] text-gray-400">
          {dataUser?.data().bio}
        </small>
      </header>
      {/* {dataUsers.map((document, i) => {
        if (document.data().username == username && !isUserFound) {
            isUserFound = true;
          return (
              <header
                className="flex flex-col justify-center items-center mt-10"
                key={i}
              >
                <img
                  src={document.data().photoURL}
                  className="w-14 rounded-full"
                  alt="Photo Profile"
                />
                <h3 className="font-semibold text-[.8rem] mt-3">
                  {document.data().username}
                </h3>
                <small className="text-[9px] text-gray-400">
                  {document.data().bio}
                </small>
              </header>
          );
        }
      })} */}
    </>
  );
}
