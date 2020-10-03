import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { useRootData } from "features/core/hooks";

import { createChart, createSeries } from "./utils";

import css from "./index.module.css";

const Chart: React.FC = observer(() => {
  const { tags, data, chartInstance, setChartInstance } = useRootData(
    (state) => ({
      tags: state.core.tags,
      data: state.core.data,
      chartInstance: state.core.chartInstance,
      setChartInstance: state.core.setChartInstance,
    })
  );

  useEffect(() => {
    const { chart } = createChart("chart");
    setChartInstance(chart);
    return () => chart.dispose();
  }, [setChartInstance]);

  useEffect(() => {
    console.log("ready for data", chartInstance);
    if (chartInstance) {
      if (data.length) {
        chartInstance.yAxes.clear();
        chartInstance.series.clear();
        chartInstance.data = data;

        // tags.forEach(({ id }) => createSeries(chartInstance, id));
      }
    }
  }, [tags, data, chartInstance]);

  return (
    <div className={css.layout}>
      <div className={css.chartLayout}>
        <div className={css.chart} id="chart" />
      </div>
      <div className={css.chartDateAxis} id="date-axis" />
    </div>
  );
});

export default Chart;
