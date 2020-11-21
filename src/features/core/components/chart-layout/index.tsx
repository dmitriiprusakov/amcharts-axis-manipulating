import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { useRootData } from "features/core/hooks";

import { createChart, createSeries, createValueAxis } from "./utils";

import css from "./index.module.css";

const ChartLayout: React.FC = observer(() => {
  const {
    tagsDictionary,
    axesOrder,
    axesDictionary,
    data,
    chartInstance,
    setChartInstance,
  } = useRootData((state) => ({
    tagsDictionary: state.core.tagsDictionary,
    axesOrder: state.core.axesOrder,
    axesDictionary: state.core.axesDictionary,
    data: state.core.data,
    chartInstance: state.core.chartInstance,
    setChartInstance: state.core.setChartInstance,
  }));

  useEffect(() => {
    const { chart } = createChart("chart");
    setChartInstance(chart);
    return () => chart.dispose();
  }, [setChartInstance]);

  useEffect(() => {
    if (chartInstance) {
      if (data.length) {
        chartInstance.yAxes.clear();
        chartInstance.series.clear();
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
  }, [axesOrder, axesDictionary, tagsDictionary, data, chartInstance]);

  return (
    <div className={css.layout}>
      <div className={css.chartLayout}>
        <div className={css.chart} id="chart" />
      </div>
    </div>
  );
});

export default ChartLayout;
