import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { Tag } from "features/core/types";
import { ValueAxis, XYChart, XYSeries } from "@amcharts/amcharts4/charts";

am4core.options.minPolylineStep = 5;
const createChart = (div: string): { chart: XYChart } => {
  const chart = am4core.create(div, am4charts.XYChart);

  chart.padding(0, 0, 0, 0); // reset default 0's
  chart.leftAxesContainer.layout = "vertical";

  const dateAxis = createDateAxis(chart);

  const cursor = new am4charts.XYCursor();
  chart.cursor = cursor;
  chart.cursor.xAxis = dateAxis;

  return { chart };
};

const createDateAxis = (chart: XYChart) => {
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 0.5;
  dateAxis.renderer.minGridDistance = 100;

  dateAxis.renderer.line.stroke = am4core.color("#000000");

  dateAxis.renderer.labels.template.location = 0.5;
  dateAxis.renderer.labels.template.verticalCenter = "middle";
  dateAxis.renderer.labels.template.horizontalCenter = "middle";

  return dateAxis;
};

const createValueAxis = (
  chart: am4charts.XYChart,
  index: number
): ValueAxis => {
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  valueAxis.renderer.gridContainer.background.fill = am4core.color("#f2f2f2");
  valueAxis.renderer.minGridDistance = 30;

  valueAxis.renderer.inside = true;
  valueAxis.renderer.maxLabelPosition = 0.99;
  valueAxis.renderer.labels.template.verticalCenter = "bottom";

  if (index !== 0) {
    valueAxis.marginBottom = 10;
  }

  return valueAxis;
};

const createSeries = (
  chart: XYChart,
  valueAxis: ValueAxis,
  tag: Tag,
  index: number
): XYSeries => {
  let series: am4charts.XYSeries;
  if (!valueAxis) {
    const newValueAxis = createValueAxis(chart, index);
    series = createSeriesInstance(chart, newValueAxis, tag);
  } else {
    series = createSeriesInstance(chart, valueAxis, tag);
  }

  return series;
};

const createSeriesInstance = (
  chart: am4charts.XYChart,
  valueAxis: ValueAxis,
  { id, name }: Tag
) => {
  const seriesInstance = chart.series.push(new am4charts.LineSeries());
  seriesInstance.strokeWidth = 2;

  seriesInstance.dataFields.valueY = `${id}`;
  seriesInstance.dataFields.dateX = "ts";
  seriesInstance.yAxis = valueAxis;
  seriesInstance.name = name;
  seriesInstance.tooltipText = `{name}\nЗначение: {valueY}`;

  return seriesInstance;
};

export { createChart, createSeries, createValueAxis };
