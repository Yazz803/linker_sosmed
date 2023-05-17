/* eslint-disable @next/next/no-img-element */
import {
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  PicCenterOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "yazz/context/AuthContext";
import { getUser } from "yazz/utils/helpers";
export default function NavbarMobile() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);
  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24,
        bottom: 60,
      }}
      icon={<CustomerServiceOutlined />}
      className="font-bold"
    >
      <div className="relative mt-2">
        <p className="bg-white px-2 shadow-md rounded-full fixed right-20 mt-2">
          {user?.data().name}
        </p>
        <FloatButton
          icon={
            <img
              src={user?.data().photoURL}
              className="rounded-full scale-150"
              alt="Photo Profile"
            />
          }
        />
      </div>
      <div className="relative mt-2" onClick={() => router.push("/admin")}>
        <p className="bg-white px-2 shadow-md rounded-full fixed right-20 mt-2">
          Links
        </p>
        <FloatButton icon={<PicCenterOutlined />} />
      </div>
      <div
        className="relative mt-2"
        onClick={() => router.push("/admin/appearance")}
      >
        <p className="bg-white px-2 shadow-md rounded-full fixed right-20 mt-2">
          Appearance
        </p>
        <FloatButton icon={<PieChartOutlined />} />
      </div>
      <div className="relative mt-2">
        <p className="bg-white px-2 shadow-md rounded-full fixed right-20 mt-2">
          Help
        </p>
        <FloatButton icon={<QuestionCircleOutlined />} />
      </div>
    </FloatButton.Group>
    // <div className="fixed right-5 bottom-5">
    //   <Dropdown menu={{ items: items }} trigger={["click"]}>
    //     <Button>
    //       <Space>
    //         Menu
    //         <DownOutlined />
    //       </Space>
    //     </Button>
    //   </Dropdown>
    // </div>
  );
}
