import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import PreviewWeb from "@/components/PreviewWeb"
import Paragraph from "@/components/ui/Paragraph"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { updateDataDoc, useGetCollection } from "@/utils/helpers"
import { useToast } from "@/utils/use-toast"
import { Link } from "lucide-react"

type User = {
  id: string
  uid: string
  username: string
  bio: string
  photoURL: string
}

export const Index = (): JSX.Element => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { data: dataUsers, loading } = useGetCollection("users")
  const { toast } = useToast()

  useEffect(() => {
    if (!currentUser) router.push("/login")
  }, [currentUser, router])

  const copyMe = () => {
    const foundUser = dataUsers.find(
      (user: User) => user.uid === currentUser?.uid
    )
    const username = foundUser?.username
    if (process.env.NODE_ENV === "production") {
      navigator.clipboard.writeText(
        `https://linker-sosmed.vercel.app/u/${username}`
      )
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/u/${username}`)
    }
    toast({
      title: "Copied",
      description: "Link copied to clipboard",
    })
  }
  return (
    <>
      {currentUser && (
        <Layout>
          {loading ? (
            <div className="flex items-center justify-center h-96 flex-col gap-2">
              <Paragraph>Loading...</Paragraph>
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white" />
            </div>
          ) : (
            <>
              {dataUsers.map((user: User, i: number) => {
                if (user.uid === currentUser.uid) {
                  return (
                    <div className="px-16" key={i}>
                      <div className="flex">
                        <div className="mt-24 w-[60%]">
                          <div className="mr-20">
                            <h2 className="text-xl font-bold">Profile</h2>
                            <div className="rounded-2xl p-5">
                              <div className="flex items-center gap-4">
                                {currentUser && currentUser.photoURL && (
                                  <Image
                                    src={currentUser.photoURL}
                                    className="w-24 rounded-full"
                                    alt="Photo Profile"
                                    width={100}
                                    height={100}
                                  />
                                )}
                                <div className="flex w-full flex-col gap-3">
                                  <Button
                                    variant="default"
                                    className="w-full bg-blue-500 hover:bg-blue-600"
                                  >
                                    Upload Photo
                                  </Button>
                                  <Button variant="outline" className="w-full">
                                    Remove photo
                                  </Button>
                                </div>
                                <Button onClick={copyMe} variant="link">
                                  <Link />
                                </Button>
                              </div>
                              <form className="mt-8">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                  <Label>Profile Title</Label>
                                  <Input
                                    placeholder="Profile Title"
                                    maxLength={30}
                                    defaultValue={user.username}
                                  />
                                  <p className="text-sm text-muted-foreground">
                                    Masukan Profile Title.
                                  </p>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                  <Label>Bio</Label>
                                  <Input
                                    placeholder="Bio"
                                    maxLength={80}
                                    onChange={(e) => {
                                      updateDataDoc("users", user.id, {
                                        bio: e.target.value,
                                      })
                                    }}
                                    defaultValue={user.bio}
                                  />
                                  <p className="text-sm text-muted-foreground">
                                    Masukan Bio
                                  </p>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="sticky top-0 flex h-screen w-[40%] items-center justify-center border-l border-gray-300">
                          <PreviewWeb />
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </>
          )}
        </Layout>
      )}
    </>
  )
}

export default Index
