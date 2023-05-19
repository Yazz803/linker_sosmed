/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Switch, Dropdown, Form } from "antd";
import { updateDataDoc, deleteDataDoc } from "yazz/utils/helpers";

export default function CardLink(props) {
  const [form] = Form.useForm();

  useEffect(() => form.resetFields(), [form, props.document, props.user.id]);
  const [title, setTitle] = useState(props.document.data().title);
  const [link, setLink] = useState(props.document.data().link);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateDataDoc(`users/${props.user.id}/links`, props.document.id, {
        title: title,
        link: link,
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [title, link]);

  const handleChangeSwitch = (userId, docId, value) => {
    updateDataDoc(`users/${userId}/links`, docId, {
      is_active: value,
    });
  };
  return (
    <div className="bg-gray-600 text-white rounded-lg mt-4 py-6 px-4 shadow-2xl shadow-gray-500/100">
      <div className="flex gap-6 items-center">
        <div className="cursor-pointer">
          <UnorderedListOutlined />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <Form
              form={form}
              initialValues={{
                link_title: props.document.data().title,
                link_url: props.document.data().link,
              }}
              className="w-full"
            >
              <Form.Item name="link_title" className="m-0">
                <Input
                  className="p-0 font-semibold w-[100%] mb-3 text-white"
                  size="large"
                  // suffix={<EditOutlined />}
                  bordered={false}
                  value={props.document.data().title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Masukan title link"
                />
              </Form.Item>
              <Form.Item name="link_url" className="m-0">
                <Input
                  className="p-0 font-semibold w-[100%] text-white"
                  size="large"
                  // suffix={<EditOutlined />}
                  bordered={false}
                  value={props.document.data().link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  placeholder="Masukan URL"
                />
              </Form.Item>
            </Form>
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
