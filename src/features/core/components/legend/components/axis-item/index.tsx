/* eslint-disable react/jsx-props-no-spreading */
import { Draggable } from "react-beautiful-dnd";
import React, { FC } from "react";
import cn from "classnames";

import { Axis } from "features/core/types";
import css from "./index.module.css";

type AxisItemProps = {
  axis: Axis;
  index: number;
};
const AxisItem: FC<AxisItemProps> = ({ axis, index }: AxisItemProps) => {
  console.log("axis", axis);

  return (
    <Draggable draggableId={`${axis.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={cn(css.axisItem, {
            [css.isAxisItemDraggableNow]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className={css.axisTitle}>
            <span>{axis.name}</span>
            <span className={css.axisDragIcon}>⋮⋮</span>
          </h4>
          <div className={css.axisTags}>
            {axis.tags.map((tag) => {
              return <div key={tag.id}>{tag.name}</div>;
            })}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default AxisItem;
