/* eslint-disable react/jsx-props-no-spreading */
import { Draggable, Droppable } from "react-beautiful-dnd";
import React, { FC } from "react";
import cn from "classnames";

import { Axis } from "features/core/types";
import TagItem from "../tag-item";
import css from "./index.module.css";

type AxisItemProps = {
  axis: Axis;
  index: number;
};
const AxisItem: FC<AxisItemProps> = ({
  axis: { tags, name, id },
  index,
}: AxisItemProps) => {
  // console.log("axis", axis);
  const AxisTitle = (
    <h4 className={css.axisTitle}>
      <span>{name}</span>
      <span className={css.axisDragIcon}>⋮⋮</span>
    </h4>
  );

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(providedDraggable, snapshot) => (
        <div
          ref={providedDraggable.innerRef}
          className={cn(css.axisItem, {
            [css.isAxisItemDraggableNow]: snapshot.isDragging,
          })}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
        >
          {AxisTitle}
          <Droppable droppableId={id} type="series">
            {(providedDroppable) => (
              <div
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                className={css.axisTags}
              >
                {Object.keys(tags).map((tagKey, tagIndex) => {
                  const tag = tags[tagKey];
                  return <TagItem key={tag.id} index={tagIndex} tag={tag} />;
                })}
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>

          <div />
        </div>
      )}
    </Draggable>
  );
};

export default AxisItem;
