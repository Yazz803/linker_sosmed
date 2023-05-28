/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Input, Switch, Form } from "antd";
import { updateDataDoc } from "yazz/utils/helpers";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "yazz/constants/constants";
import ButtonDeleteCard from "./ButtonDeleteCard";

export default function CardLink(props) {
  const handleOnChange = (field, value, maxLength = 20) => {
    if (value.length > maxLength) return;
    updateDataDoc(`users/${props.user.id}/links`, props.document.id, {
      [field]: value,
      is_active: true,
    });
    if (value == "") {
      handleChangeSwitch(props.document.id, false);
    }
  };

  const handleChangeSwitch = (docId, value) => {
    updateDataDoc(`users/${props.user.id}/links`, docId, {
      is_active: value,
    });
  };

  // Draggable
  const cardRef = useRef(null);
  const [{ scale, opacity }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, index: props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      scale: monitor.isDragging() ? "1.05" : "1",
      // opacity: monitor.isDragging() ? 0 : 1,
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
      style={{ scale, opacity }}
    >
      <div className="flex gap-6 my-auto">
        <div ref={cardRef} className="pl-4 m-auto py-8 cursor-pointer">
          <UnorderedListOutlined />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <Form className="w-full">
              <Input
                className="p-0 font-semibold w-[100%] mb-3 text-white"
                size="large"
                maxLength={20}
                bordered={false}
                value={props.document.data().title}
                onChange={(e) => {
                  handleOnChange("title", e.target.value);
                }}
                placeholder="Masukan title link"
              />
              <Input
                className="p-0 font-semibold w-[100%] text-white"
                size="large"
                bordered={false}
                value={props.document.data().link}
                onChange={(e) => {
                  handleOnChange("link", e.target.value, 5000);
                }}
                placeholder="Masukan URL"
              />
            </Form>
            <div>
              <Switch
                className="bg-gray-400"
                onChange={() =>
                  handleChangeSwitch(
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
