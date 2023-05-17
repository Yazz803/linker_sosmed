import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import Paragraph from "@/components/ui/Paragraph"
import { useGetCollection } from "@/utils/helpers"

const UserWebPage = (): JSX.Element => {
  const router = useRouter()
  const { username } = router.query
  const { data: dataUsers, loading: usersLoading } = useGetCollection("users")
  const { data: appSettings, loading: appSettingsLoading } = useGetCollection(
    `users/${dataUsers[0]?.id}/app_settings`
  )
  const isLoading = usersLoading || appSettingsLoading

  const dataUser = dataUsers.find((document) => document.username === username)
  const appSetting = appSettings[0]

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center h-96 flex-col gap-2">
          <Paragraph>Loading...</Paragraph>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white" />
        </div>
      ) : (
        <div className="mt-10 flex h-96 flex-col items-center justify-center">
          {/* {links.map((document, i) => ( */}
          <>
            <p>{appSetting?.font_family}</p>
          </>
          {/* ))} */}
          <Image
            src={dataUser?.photoURL}
            className="rounded-full"
            alt="Photo Profile"
            width={100}
            height={100}
          />
          <Paragraph className="mt-3 font-semibold">
            {dataUser?.username}
          </Paragraph>
          <Paragraph className="text-[9px] text-gray-400">
            {dataUser?.bio}
          </Paragraph>
        </div>
      )}
    </Layout>
  )
}

export default UserWebPage
