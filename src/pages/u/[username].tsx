import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import Heading from "@/components/ui/Heading"
import Paragraph from "@/components/ui/Paragraph"
import GetCollection, { GetSubCollection } from "@/utils/helpers"

const UserWebPage = (): JSX.Element => {
  const router = useRouter()
  const { username } = router.query
  const dataUsers = GetCollection("users")
  let dataUser = dataUsers.find(
    (document) => document.data().username == username
  )
  // console.log("bang", dataUser);
  const appSetting = GetSubCollection(`users/${dataUser?.id}/app_settings`)[0]
  // console.log("links", links);
  return (
    <Layout>
      <div className="mt-10 flex h-96 flex-col items-center justify-center">
        {/* {links.map((document, i) => ( */}
        <>
          <p>{appSetting?.data()?.font_family}</p>
        </>
        {/* ))} */}
        <Image
          src={dataUser?.data().photoURL}
          className="rounded-full"
          alt="Photo Profile"
          width={100}
          height={100}
        />
        <Paragraph className="mt-3 font-semibold">
          {dataUser?.data().username}
        </Paragraph>
        <Paragraph className="text-[9px] text-gray-400">
          {dataUser?.data().bio}
        </Paragraph>
      </div>
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
    </Layout>
  )
}

export default UserWebPage
