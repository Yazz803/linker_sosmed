/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Form, Input, Divider, message } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import SignInWithGoogle from "yazz/utils/SignInProvider/SignInWithGoogle";
// import SignInWithGithub from "yazz/utils/SignInProvider/SignInWithGithub";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import Metadata from "yazz/components/Metadata";
import Link from "next/link";
import GetCollection, { addDataDoc, randomInt } from "yazz/utils/helpers";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "yazz/config/firebase";
import { serverTimestamp } from "firebase/firestore";
// import { GetCollection } from "../utils/helpers";

export default function RegisterPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const dataUsers = GetCollection("users");

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, [currentUser, router]);

  const onSubmitRegister = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        const foundUser = dataUsers.find(
          (doc) => doc.data().uid === res.user.uid
        );
        console.log("id", res.id);
        console.log("user", res.user);
        let dataUser = {
          uid: res.user.uid,
          name: "user" + randomInt(6),
          email: res.user.email,
          photoURL: "/images/photo-profile.webp",
          username: "user" + randomInt(6),
          profile_title: "user" + randomInt(6),
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
        if (!foundUser) {
          addDataDoc("users", dataUser).then((res) => {
            addDataDoc(`users/${res.id}/appearance_settings`, appSettings);
          });
        }

        // success
        router.push("/admin");
        message.success("Successfully Registered!");
      })
      .catch((error) => {
        console.log({ error });
        message.error("Email already in use!");
      });
  };

  return (
    <>
      <Metadata
        title="Yazzlinker"
        canonical={process.env.NEXT_PUBLIC_SITE_URL}
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL,
          title: "Yazzlinker",
          images: [
            {
              url: "/images/seoimage.jpg",
              width: 800,
              height: 800,
              alt: "Create your own yazzlinker",
            },
          ],
        }}
        icon="/images/loadingscreen.gif"
      />
      {!currentUser && (
        <div className="flex justify-center items-center h-screen login__page costum__bg__image">
          <Form
            name="normal_login"
            className="login__form border w-[90%] lg:w-1/3 p-8 rounded-lg shadow-lg"
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => onSubmitRegister(values)}
            autoComplete="off"
          >
            <h2 className="text-center text-2xl font-bold">Register</h2>
            <h2 className="text-center text-sm font-semibold">
              Create your account
            </h2>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <div className="flex justify-between items-center gap-4 flex-col-reverse w-full">
              <p className="login-form-forgot m-0">
                Already have an account?{" "}
                <Link className="text-blue-600" href="/login">
                  Sign In
                </Link>
              </p>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold rounded-md px-5 py-2">
                Sign Up <LoginOutlined />
              </button>
            </div>

            <Divider plain>OR</Divider>

            <section className="flex flex-col items-center">
              <SignInWithGoogle />
              {/* <SignInWithGithub /> */}
            </section>
          </Form>
        </div>
      )}
    </>
  );
}
