import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
export default function NavbarMobile() {
  return (
    <div className="fixed right-5 bottom-5">
      <Dropdown menu={{ items: items }} trigger={["click"]}>
        <Button>
          <Space>
            Menu
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}
