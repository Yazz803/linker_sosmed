import React, { useEffect } from "react";
import { Form, Input, Divider, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import SignInWithGoogle from "yazz/utils/SignInProvider/SignInWithGoogle";
// import SignInWithGithub from "yazz/utils/SignInProvider/SignInWithGithub";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import Metadata from "yazz/components/Metadata";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "yazz/config/firebase";
import GetCollection from "yazz/utils/helpers";
// import { GetCollection } from "../utils/helpers";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const dataUsers = GetCollection("users");

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, [currentUser, router]);

  const onSubmitLogin = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        router.push("/admin");
        const foundUser = dataUsers.find(
          (doc) => doc.data().uid === res.user.uid
        );
        if (foundUser) {
          let dataUser = {
            uid: foundUser.data().uid,
            name: foundUser.data().name,
            email: foundUser.data().email,
            photoURL: foundUser.data().photoURL,
            username: foundUser.data().username,
            profile_title: foundUser.data().profile_title,
            bio: foundUser.data().bio,
            createdAt: foundUser.data().createdAt,
          };
          localStorage.setItem(
            "user_yazz_linker",
            JSON.stringify({ ...dataUser })
          );
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode });
        console.log({ errorMessage });
        message.error("Email or Password is wrong!");
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
            className="login__form w-[90%] border lg:w-1/3 p-8 rounded-lg shadow-lg"
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => onSubmitLogin(values)}
            autoComplete="off"
          >
            <h2 className="text-center text-2xl font-bold">Welcome back</h2>
            <h2 className="text-center text-ml">Log in to your web app</h2>
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
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox checked={true}>Remember me</Checkbox>
              </Form.Item>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold rounded-md px-5 py-2">
                Sign In <LoginOutlined />
              </button>
            </div>
            <p className="login-form-forgot m-0 mt-4">
              Don&apos;t have an account?{" "}
              <Link className="text-blue-600" href="/register">
                Sign Up
              </Link>
            </p>

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
