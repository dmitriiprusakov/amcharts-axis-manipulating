/* eslint-disable react/jsx-props-no-spreading */
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import React from "react";
import cn from "classnames";

import { Tags } from "features/core/types";
import { useRootData } from "features/core/hooks";

import { AxisItem } from "./components";

import css from "./index.module.css";

const Legend: React.FC = observer(() => {
  const {
    axesOrder,
    axesDictionary,
    setAxesOrder,
    setAxesDictionary,
    isSiderCollapsed,
  } = useRootData((state) => ({
    axesOrder: state.core.axesOrder,
    axesDictionary: state.core.axesDictionary,
    setAxesOrder: state.core.setAxesOrder,
    setAxesDictionary: state.core.setAxesDictionary,
    isSiderCollapsed: state.core.isSiderCollapsed,
  }));

  const onDragEnd = ({
    draggableId,
    destination,
    source,
    type,
  }: DropResult) => {
    if (!destination) return; // TODO: creating new axis

    const isSamePlace =
      destination.droppableId === source.droppableId &&
      destination.index === source.index;

    if (isSamePlace) return;

    if (type === "axes") {
      // To re-order axes
      const newAxesOrder = Array.from(axesOrder);
      newAxesOrder.splice(source.index, 1);
      newAxesOrder.splice(destination.index, 0, draggableId);

      setAxesOrder(newAxesOrder);
      return;
    }

    const startAxis = axesDictionary[source.droppableId];
    const finishAxis = axesDictionary[destination.droppableId];
    // console.log(startAxis, finishAxis);

    if (startAxis === finishAxis) {
      // Moving tags inside axis

      const newTags = Array.from(startAxis.tags);
      newTags.splice(source.index, 1);
      newTags.splice(destination.index, 0, draggableId);

      const newAxesDictionary = {
        ...axesDictionary,
        [source.droppableId]: {
          ...startAxis,
          tags: newTags,
        },
      };
      setAxesDictionary(newAxesDictionary);
      return;
    }
    // Moving tag from one axis to another

    const startTagsKeys = Array.from(startAxis.tags);
    // Updating start axis - removing draggable tag
    startTagsKeys.splice(source.index, 1);
    console.log("startTagsKeys", startTagsKeys);

    const newStartAxis = {
      [source.droppableId]: {
        ...startAxis,
        tags: startTagsKeys,
      },
    };

    const finishTagsKeys = Array.from(finishAxis.tags);
    // Updating finish axis - adding draggable tag
    finishTagsKeys.splice(destination.index, 0, draggableId);

    const newFinishAxis = {
      [destination.droppableId]: {
        ...finishAxis,
        tags: finishTagsKeys,
      },
    };
    const newAxesDictionary = {
      ...axesDictionary,
      ...newStartAxis,
      ...newFinishAxis,
    };
    if (!startTagsKeys.length) {
      delete newAxesDictionary[source.droppableId];
      setAxesOrder(axesOrder.filter((axis) => axis !== source.droppableId));
    }
    console.log("newAxesDictionary", newAxesDictionary);

    // Clearing empty axes
    // const clearedAxesDictionary =
    setAxesDictionary(newAxesDictionary);
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
                  const axis = axesDictionary[axisKey];
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
