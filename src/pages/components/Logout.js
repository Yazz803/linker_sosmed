import { message } from "antd";
import { useRouter } from "next/router";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "yazz/context/AuthContext";
import { auth } from "yazz/config/firebase";
export function Logout() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const out = () => {
    auth.signOut();
    router.push("/login");
    message.success("Berhasil Logout!");
  };
  return (
    currentUser && (
      <button onClick={out} className="m-0 flex items-center gap-2">
        <LogoutOutlined /> Sign Out
      </button>
    )
  );
}