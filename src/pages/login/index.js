import React, { useEffect } from "react";
import { Form, Input, Checkbox, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SignInWithGoogle from "yazz/utils/SignInProvider/SignInWithGoogle";
import SignInWithGithub from "yazz/utils/SignInProvider/SignInWithGithub";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import Metadata from "yazz/components/Metadata";
// import { GetCollection } from "../utils/helpers";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) router.push("/admin");
  }, [currentUser, router]);

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
            className="login__form border lg:w-1/3 p-8 rounded-lg shadow-lg"
            initialValues={{
              remember: true,
            }}
            onFinish={() => {}}
          >
            <h2 className="text-center text-2xl font-bold">Welcome back</h2>
            <h2 className="text-center text-ml">Log in to your web app</h2>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                disabled
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
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
              <Input
                disabled
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot text-blue-600" href="#">
                Forgot password
              </a>
            </div>

            <Divider plain>OR</Divider>

            <section className="flex flex-col items-center">
              <SignInWithGoogle />
              <SignInWithGithub />
            </section>
          </Form>
        </div>
      )}
    </>
  );
}
