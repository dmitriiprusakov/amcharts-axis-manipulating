/* eslint-disable react/jsx-props-no-spreading */
import { Droppable } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import React from "react";
import cn from "classnames";

import { useRootData } from "features/core/hooks";

import css from "./index.module.css";

const NewAxisCreator: React.FC = observer(() => {
  const { isTagDraggingNow } = useRootData((state) => ({
    isTagDraggingNow: state.core.isTagDraggingNow,
  }));

  return (
    <Droppable direction="vertical" droppableId="new-axis" type="new-axis">
      {(provided, { isDraggingOver }) => (
        <div
          className={cn(css.droppableContainer, {
            [css.isDroppableNow]: isTagDraggingNow,
          })}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <span>Drop tag here </span>
          <span>to create new axis</span>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
});

export default NewAxisCreator;
