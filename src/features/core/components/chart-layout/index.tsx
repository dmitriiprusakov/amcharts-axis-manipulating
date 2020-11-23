import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { useRootData } from "features/core/hooks";

import { XYSeries } from "@amcharts/amcharts4/charts";
import { createChart, createSeries, createValueAxis } from "./utils";

import css from "./index.module.css";

const ChartLayout: React.FC = observer(() => {
  const {
    tagsDictionary,
    axesOrder,
    axesDictionary,
    data,
    chartInstance,
    colorSet,
    hoveredSeries,
    setChartInstance,
  } = useRootData((state) => ({
    tagsDictionary: state.core.tagsDictionary,
    axesOrder: state.core.axesOrder,
    axesDictionary: state.core.axesDictionary,
    data: state.core.data,
    chartInstance: state.core.chartInstance,
    colorSet: state.core.colorSet,
    hoveredSeries: state.core.hoveredSeries,
    setChartInstance: state.core.setChartInstance,
  }));

  useEffect(() => {
    const { chart } = createChart("chart");
    setChartInstance(chart);
    return () => chart.dispose();
  }, [setChartInstance]);

  useEffect(() => {
    console.log("hoveredSeries", hoveredSeries);

    function processOver(hovered: XYSeries | undefined) {
      if (!hovered) return;
      hovered.toFront();

      // @ts-ignore
      hovered.segments.each((segment) => {
        segment.setState("hover");
      });

      chartInstance?.series.each((series) => {
        if (series !== hovered) {
          // @ts-ignore

          series.segments.each((segment) => {
            segment.setState("dimmed");
          });
          series.bulletsContainer.setState("dimmed");
        }
      });
    }

    function processOut() {
      chartInstance?.series.each((series) => {
        // @ts-ignore
        series.segments.each((segment) => {
          segment.setState("default");
        });
        series.bulletsContainer.setState("default");
      });
    }

    if (hoveredSeries) {
      const hovered = chartInstance?.series.values.find(
        (series) => series.id === hoveredSeries.id
      );
      processOver(hovered);
    } else {
      processOut();
    }
  }, [chartInstance, hoveredSeries]);

  useEffect(() => {
    if (chartInstance) {
      if (data.length) {
        chartInstance.yAxes.clear();
        chartInstance.series.clear();
        colorSet.reset();
        chartInstance.data = data;

        axesOrder.forEach((axisKey, index) => {
          const valueAxis = createValueAxis(chartInstance, index);

          const axis = axesDictionary[axisKey];

          axis.tags.map((tagKey) => {
            const tag = tagsDictionary[tagKey];
            return createSeries(chartInstance, valueAxis, tag, 0);
          });
        });
      }
    }
  }, [
    colorSet,
    axesOrder,
    axesDictionary,
    tagsDictionary,
    data,
    chartInstance,
  ]);

  return (
    <div className={css.layout}>
      <div className={css.chartLayout}>
        <div className={css.chart} id="chart" />
      </div>
    </div>
  );
});

export default ChartLayout;
