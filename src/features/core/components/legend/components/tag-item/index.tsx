/* eslint-disable react/jsx-props-no-spreading */
import { Draggable } from "react-beautiful-dnd";
import React, { FC } from "react";
import cn from "classnames";

import { Tag } from "features/core/types";
import css from "./index.module.css";

type TagItemProps = {
  tag: Tag;
  index: number;
};
const TagItem: FC<TagItemProps> = ({ tag, index }: TagItemProps) => {
  //   console.log("tag", tag);

  return (
    <Draggable draggableId={`${tag.id}`} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
        <h4
          ref={innerRef}
          className={cn(css.tagItem)}
          {...draggableProps}
          {...dragHandleProps}
        >
          <span>{tag.name}</span>
          <span className={css.tagDragIcon}>⋮</span>
        </h4>
      )}
    </Draggable>
  );
};

export default TagItem;
