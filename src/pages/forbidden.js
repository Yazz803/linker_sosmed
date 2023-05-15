import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ForbiddenPage() {
  const [count, setCount] = useState(3);
  const router = useRouter();
  useEffect(() => {
    if (count <= 0) {
      router.push("/login");
    } else {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count, router]);
  return (
    <div
      className={`bg-gray-800 h-screen flex items-center justify-center flex-col login__page`}
    >
      <div className="md:flex flex-col justify-center items-center shadow-sm p-6 rounded-md bg-[#ffffff67] backdrop-blur-sm">
        <div className="md:flex items-center justify-center text-black">
          <h1 className="text-center text-9xl font-bold">
            403 |<span className="md:hidden">|</span>
          </h1>
          <h1 className="text-6xl font-bold uppercase"> forbidden</h1>
        </div>
        <p className="text-2xl text-black text-center">Login Dulu ya...</p>
        <p className="text-2xl text-black text-center">
          Kamu akan diarahkan ke Login Page dalam {count} detik
        </p>
      </div>
    </div>
  );
}
