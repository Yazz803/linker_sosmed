import React from "react";
import { UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Switch, Dropdown } from "antd";
import { updateDataDoc, deleteDataDoc } from "yazz/utils/helpers";

export default function CardHeader(props) {
  const handleChangeSwitch = (userId, docId, value) => {
    updateDataDoc(`users/${userId}/links`, docId, {
      is_active: value,
    });
  };
  return (
    <div className="bg-white rounded-lg mt-4 py-6 px-4 shadow-2xl shadow-gray-500/100">
      <div className="flex gap-6 items-center">
        <div className="cursor-pointer">
          <UnorderedListOutlined />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div className="w-full">
              <Input
                className="p-0 font-semibold w-[100%] text-center mb-3"
                size="large"
                // suffix={<EditOutlined />}
                bordered={false}
                value={props.document.data().title}
                onChange={(e) => {
                  updateDataDoc(
                    `users/${props.user.id}/links`,
                    props.document.id,
                    {
                      title: e.target.value,
                    }
                  );
                }}
                maxLength={35}
                placeholder="Masukan title link"
              />
            </div>
            <div>
              <Switch
                className="bg-gray-400"
                onChange={() =>
                  handleChangeSwitch(
                    props.user.id,
                    props.document.id,
                    !props.document.data().is_active
                  )
                }
                checked={props.document.data().is_active}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="something here"></div>
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
                            onClick={() =>
                              deleteDataDoc(
                                `users/${props.user.id}/links`,
                                props.document.id
                              )
                            }
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
          </div>
        </div>
      </div>
    </div>
  );
}
