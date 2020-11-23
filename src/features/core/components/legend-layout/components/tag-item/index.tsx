/* eslint-disable react/jsx-props-no-spreading */
import { Draggable } from "react-beautiful-dnd";
import React, { FC, useEffect } from "react";
import cn from "classnames";

import { Tag } from "features/core/types";
import { useRootData } from "features/core/hooks";
import useHover from "features/core/hooks/use-hover";

import css from "./index.module.css";

type TagItemProps = {
  tag: Tag;
  index: number;
};
const TagItem: FC<TagItemProps> = ({ tag, index }: TagItemProps) => {
  const [hoverRef, isHovered] = useHover();
  const { setHoveredSeries } = useRootData((state) => ({
    setHoveredSeries: state.core.setHoveredSeries,
  }));

  useEffect(() => {
    if (isHovered) {
      setHoveredSeries(tag);
    } else {
      setHoveredSeries(null);
    }
  }, [tag, isHovered, setHoveredSeries]);

  return (
    <Draggable draggableId={`${tag.id}`} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
        <h4
          ref={innerRef}
          className={cn(css.tagItem, {
            [css.isTagItemDraggableNow]: snapshot.isDragging,
          })}
          {...draggableProps}
          {...dragHandleProps}
        >
          <div ref={hoverRef} className={css.hoverer}>
            <span>{tag.name}</span>
            <span className={css.tagDragIcon}>⋮</span>
          </div>
        </h4>
      )}
    </Draggable>
  );
};

export default TagItem;
