/* eslint-disable react/jsx-props-no-spreading */
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRootData } from "features/core/hooks";
import React, { FC } from "react";
import cn from "classnames";

import { Axis } from "features/core/types";
import { observer } from "mobx-react-lite";
import TagItem from "../tag-item";
import css from "./index.module.css";

type AxisItemProps = {
  axis: Axis;
  index: number;
};
const AxisItem: FC<AxisItemProps> = observer(
  ({ axis: { tags, name, id }, index }: AxisItemProps) => {
    const { tagsDictionary, isTagDraggingNow } = useRootData((state) => ({
      tagsDictionary: state.core.tagsDictionary,
      isTagDraggingNow: state.core.isTagDraggingNow,
    }));

    return (
      <Draggable draggableId={`${id}`} index={index}>
        {(providedDraggable, { isDragging }) => (
          <div
            ref={providedDraggable.innerRef}
            className={cn(css.axisItem, {
              [css.isAxisItemDraggableNow]: isDragging,
            })}
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
          >
            <h4
              className={cn(css.axisTitle, {
                [css.isAxisDraggableBordered]: isDragging,
              })}
            >
              <span>{name}</span>
              <span className={css.axisDragIcon}>⋮⋮</span>
            </h4>
            <Droppable droppableId={id} type="tags">
              {(providedDroppable) => (
                <div
                  ref={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                  className={cn(css.axisTags, {
                    [css.isAxisTagsDroppableNow]: isTagDraggingNow,
                    [css.isAxisDraggableBordered]: isDragging,
                  })}
                >
                  {tags.map((tagKey, tagIndex) => {
                    const tag = tagsDictionary[tagKey];
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
  }
);

export default AxisItem;
