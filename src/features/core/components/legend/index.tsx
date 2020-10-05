/* eslint-disable react/jsx-props-no-spreading */
import {
  DragDropContext,
  DragStart,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import React from "react";
import cn from "classnames";

import { useRootData } from "features/core/hooks";

import { AxisItem } from "./components";
import NewAxisCreator from "./components/new-axis-creator";
import css from "./index.module.css";

const Legend: React.FC = observer(() => {
  const {
    isSiderCollapsed,
    axesOrder,
    axesDictionary,
    setAxesOrder,
    setAxesDictionary,
    setIsTagDraggingNow,
  } = useRootData((state) => ({
    isSiderCollapsed: state.core.isSiderCollapsed,
    axesOrder: state.core.axesOrder,
    axesDictionary: state.core.axesDictionary,
    setAxesOrder: state.core.setAxesOrder,
    setAxesDictionary: state.core.setAxesDictionary,
    setIsTagDraggingNow: state.core.setIsTagDraggingNow,
  }));

  const onDragEnd = ({
    draggableId,
    destination,
    source,
    type,
  }: DropResult) => {
    setIsTagDraggingNow(false);
    if (!destination) return;

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
      // Clearing axes with no tags
      delete newAxesDictionary[source.droppableId];
      setAxesOrder(axesOrder.filter((axis) => axis !== source.droppableId));
    }

    setAxesDictionary(newAxesDictionary);
  };

  const onBeforeDragStart = (initial: DragStart) =>
    setIsTagDraggingNow(initial.type === "tags");

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
        <DragDropContext
          onBeforeDragStart={onBeforeDragStart}
          onDragEnd={onDragEnd}
        >
          <Droppable direction="vertical" droppableId="axes" type="axes">
            {(provided, { isDraggingOver }) => (
              <div
                className={cn(css.legendDroppableContainer, {
                  [css.isContainerDroppableNow]: isDraggingOver,
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
          <NewAxisCreator />
          {/* {TODO: add trash droppable} */}
        </DragDropContext>
      )}
    </div>
  );
});

export default Legend;
