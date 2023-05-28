/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Input, Switch, Form } from "antd";
import { updateDataDoc } from "yazz/utils/helpers";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "yazz/constants/constants";
import ButtonDeleteCard from "./ButtonDeleteCard";

export default function CardHeader(props) {

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
                // form={form}
                autoComplete="off"
                // initialValues={{ header_title: props.document.data().title }}
              >
                <Input
                  className="p-0 font-semibold w-[100%] text-center mb-3 text-white"
                  size="large"
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
                    // setTitle(e.target.value);
                  }}
                  maxLength={35}
                  placeholder="Masukan title link"
                />
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
            <ButtonDeleteCard user={props.user} document={props.document} />
          </div>
        </div>
      </div>
    </div>
  );
}
