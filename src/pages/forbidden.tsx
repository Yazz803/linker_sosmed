import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const ForbiddenPage = (): JSX.Element => {
  const [count, setCount] = useState(3)
  const router = useRouter()
  useEffect(() => {
    if (count <= 0) {
      router.push("/login")
    } else {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [count, router])
  return (
    <div
      className={`login__page flex h-screen flex-col items-center justify-center bg-gray-800`}
    >
      <div className="flex-col items-center justify-center rounded-md bg-[#ffffff67] p-6 shadow-sm backdrop-blur-sm md:flex">
        <div className="items-center justify-center text-black md:flex">
          <h1 className="text-center text-9xl font-bold">
            403 |<span className="md:hidden">|</span>
          </h1>
          <h1 className="text-6xl font-bold uppercase"> forbidden</h1>
        </div>
        <p className="text-center text-2xl text-black">Login Dulu ya...</p>
        <p className="text-center text-2xl text-black">
          Kamu akan diarahkan ke Login Page dalam {count} detik
        </p>
      </div>
    </div>
  )
}

export default ForbiddenPage
