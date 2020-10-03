/* eslint-disable react/jsx-props-no-spreading */
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import React from "react";
import cn from "classnames";

import { useRootData } from "features/core/hooks";

import { AxisItem } from "./components";
import css from "./index.module.css";

const Legend: React.FC = observer(() => {
  const { axes, isSiderCollapsed } = useRootData((state) => ({
    axes: state.core.axes,
    isSiderCollapsed: state.core.isSiderCollapsed,
  }));

  const onDragEnd = (result: DropResult) => {
    console.log("result", result);
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
      {Object.keys(axes).length && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable direction="vertical" droppableId="all-axises" type="axis">
            {(provided) => (
              <div
                className="container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Object.keys(axes).map((axisKey, index) => {
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
