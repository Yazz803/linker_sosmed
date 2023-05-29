import React from "react";
import { Dropdown } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteDataDoc } from "yazz/utils/helpers";

export default function ButtonDeleteCard(props) {
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}
      className="text-red-500"
      menu={{
        items: [
          {
            label: (
              <>
                <p className="font-semibold">Yakin mau di Hapus?</p>
                <div className="flex justify-around">
                  <button
                    onClick={() => {
                      deleteDataDoc(
                        `users/${props.user.id}/links`,
                        props.document.id
                      );
                    }}
                    className="text-red-500 font-bold"
                  >
                    YES!
                  </button>
                  <button className="font-bold">NOPE!</button>
                </div>
              </>
            ),
          },
        ],
      }}
    >
      <DeleteOutlined />
    </Dropdown>
  );
}
