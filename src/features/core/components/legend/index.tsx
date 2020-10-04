/* eslint-disable react/jsx-props-no-spreading */
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import React from "react";
import cn from "classnames";

import { useRootData } from "features/core/hooks";

import { AxisItem } from "./components";
import css from "./index.module.css";

const Legend: React.FC = observer(() => {
  const { axes, axesOrder, setAxesOrder, isSiderCollapsed } = useRootData(
    (state) => ({
      axes: state.core.axes,
      axesOrder: state.core.axesOrder,
      setAxesOrder: state.core.setAxesOrder,

      isSiderCollapsed: state.core.isSiderCollapsed,
    })
  );

  const onDragEnd = (result: DropResult) => {
    console.log("result", result);

    const { draggableId, destination, source, type } = result;
    if (!destination) return; // TODO: creating new axis

    const isSamePlace =
      destination.droppableId === source.droppableId &&
      destination.index === source.index;

    if (isSamePlace) return;

    if (type === "axes") {
      // to re-order axes
      const newAxesOrder = Array.from(axesOrder);

      newAxesOrder.splice(source.index, 1);
      newAxesOrder.splice(destination.index, 0, draggableId);
      console.log("newAxesOrder", newAxesOrder);

      setAxesOrder(newAxesOrder);
    }
  };

  return (
    <div className={css.legendLayout}>
      <h2
        className={cn(css.legendTitle, {
          [css.legendTitleHidden]: isSiderCollapsed,
        })}
      >
        LEGEND
      </h2>
      {axesOrder.length && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable direction="vertical" droppableId="axes" type="axes">
            {(provided, snapshot) => (
              <div
                className={cn(css.legendDroppableContainer, {
                  [css.isContainerDroppableNow]: snapshot.isDraggingOver,
                })}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {axesOrder.map((axisKey, index) => {
                  const axis = axes[axisKey];
                  return <AxisItem key={axisKey} axis={axis} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
});

export default Legend;
