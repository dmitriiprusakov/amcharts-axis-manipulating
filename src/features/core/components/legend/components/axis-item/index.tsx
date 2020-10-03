/* eslint-disable react/jsx-props-no-spreading */
import { Draggable } from "react-beautiful-dnd";
import React, { FC } from "react";

import { Axis } from "features/core/types";

type AxisItemProps = {
  axis: Axis;
  index: number;
};
const AxisItem: FC<AxisItemProps> = ({ axis, index }: AxisItemProps) => {
  return (
    <Draggable draggableId={`${axis.name}`} index={index}>
      {(provided) => (
        <div
          className="axis-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {axis.name}
          {/* <Droppable droppableId={id} type="series">
            {(providedDroppable) => (
              <div
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                className="series-items-list"
              >
                lol
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable> */}
        </div>
      )}
    </Draggable>
  );
};

export default AxisItem;
