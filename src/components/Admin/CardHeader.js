/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Switch, Dropdown, Form } from "antd";
import { updateDataDoc, deleteDataDoc } from "yazz/utils/helpers";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "yazz/constants/constants";

export default function CardHeader(props) {
  const [title, setTitle] = useState(props.document.data().title);
  const [form] = Form.useForm();

  useEffect(() => form.resetFields(), [form, props.document, props.user.id]);

  useEffect(() => {
    let foundDuplicate = props.links.find((document) => {
      title == document.data().title;
    });
    if (foundDuplicate) return;
    const timeout = setTimeout(() => {
      updateDataDoc(`users/${props.user.id}/links`, props.document.id, {
        title: title,
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [title]);

  const handleChangeSwitch = (userId, docId, value) => {
    updateDataDoc(`users/${userId}/links`, docId, {
      is_active: value,
    });
  };

  // Draggable
  const cardRef = useRef(null);
  const [{ scale }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      scale: monitor.isDragging() ? "1.05" : "1",
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item) {
      if (!cardRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex == hoverIndex) {
        return;
      }
      props.moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(cardRef));

  return (
    <div
      className="bg-gray-600 transition-all text-white rounded-lg mt-4 py-6 pr-4 shadow-2xl shadow-gray-500/100"
      style={{ scale }}
    >
      <div className="flex gap-6 items-center">
        <div ref={cardRef} className="cursor-pointer pl-4 py-6">
          <UnorderedListOutlined />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div className="w-full">
              <Form
                form={form}
                autoComplete="off"
                initialValues={{ header_title: props.document.data().title }}
              >
                <Form.Item name="header_title">
                  <Input
                    className="p-0 font-semibold w-[100%] text-center mb-3 text-white"
                    size="large"
                    // suffix={<EditOutlined />}
                    bordered={false}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    maxLength={35}
                    placeholder="Masukan title link"
                  />
                </Form.Item>
              </Form>
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
