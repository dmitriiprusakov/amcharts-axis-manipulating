/* eslint-disable react/jsx-props-no-spreading */
import { Draggable } from "react-beautiful-dnd";
import DashOutlined from "@ant-design/icons/DashOutlined";
import React, { FC } from "react";

import { Axis } from "features/core/types";

import css from "./index.module.css";

type AxisItemProps = {
  axis: Axis;
  index: number;
};
const AxisItem: FC<AxisItemProps> = ({ axis, index }: AxisItemProps) => {
  return (
    <Draggable draggableId={`${axis.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={css.axisItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className={css.axisTitle}>
            <span>{axis.name}</span>
            <span className={css.dragIcon}>⋮⋮</span>
          </h4>
        </div>
      )}
    </Draggable>
  );
};

export default AxisItem;
