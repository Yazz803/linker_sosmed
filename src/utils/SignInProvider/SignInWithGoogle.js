import { message } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "yazz/config/firebase";
import GetCollection, { addDataDoc, generateUsername } from "../helpers";
import { serverTimestamp } from "firebase/firestore";

export default function SignInWithGoogle() {
  const router = useRouter();
  const dataUsers = GetCollection("users");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const onClickSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = dataUsers.find((doc) => doc.data().uid === res.user.uid);
        router.push("/admin");
        message.success("Berhasil Login!");
        let dataUser = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          username: generateUsername(res.user.displayName),
          profile_title: generateUsername(res.user.displayName),
          bio: "This is your bio",
          createdAt: serverTimestamp(),
        };
        let appSettings = {
          background_color: "#929292",
          background_image: "none",
          button_type: "button-fill-rounded-lg",
          button_color: "#ffffff",
          button_font_color: "#888888",
          font_family: "DM sans",
          font_color: "#ffffff",
          fill: true,
          createdAt: serverTimestamp(),
        };

        localStorage.setItem(
          "user_yazz_linker",
          JSON.stringify({ ...dataUser })
        );
        if (!user) {
          addDataDoc("users", dataUser).then((res) => {
            addDataDoc(`users/${res.id}/appearance_settings`, appSettings);
          });
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  return (
    <div
      onClick={onClickSignIn}
      className="bg-blue-500 hover:bg-blue-600 transition-all text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer w-64"
    >
      <svg
        viewBox="0 0 24 24"
        className="fill-current mr-3 w-6 h-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
      </svg>
      <span className="border-l border-blue-500 h-6 w-1 block"></span>
      <span className="pl-3">Continue with Google</span>
    </div>
  );
}
