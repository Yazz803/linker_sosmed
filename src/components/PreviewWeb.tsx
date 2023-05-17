import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import GetCollection from "@/utils/helpers"

export default function PreviewWeb() {
  const { currentUser } = useAuth()
  const dataUsers = GetCollection("users")
  return (
    <div className="smartphone dark:border-white ">
      <div className="screen">
        {dataUsers.map((doc) => {
          if (doc.data().uid == currentUser?.uid)
            return (
              <header className="mt-10 flex flex-col items-center justify-center">
                <Image
                  src={doc.data().photoURL}
                  className="w-14 rounded-full"
                  alt="Photo Profile"
                  width={100}
                  height={100}
                />
                <h3 className="mt-3 text-[.8rem] font-semibold">
                  {doc.data().username}
                </h3>
                <small className="text-[9px] text-gray-400">
                  {doc.data().bio}
                </small>
              </header>
            )
        })}
      </div>
    </div>
  )
}
