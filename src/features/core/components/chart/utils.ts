import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { ValueAxis, XYChart, XYSeries } from "@amcharts/amcharts4/charts";

const interfaceColors = new am4core.InterfaceColorSet();

const createChart = (div: string): { chart: XYChart } => {
  const chart = am4core.create(div, am4charts.XYChart);

  chart.padding(0, 0, 0, 0); // reset default 0's
  chart.leftAxesContainer.layout = "vertical";

  const dateAxis = createDateAxis(chart);

  const cursor = new am4charts.XYCursor();
  chart.cursor = cursor;
  chart.cursor.xAxis = dateAxis;

  const axisContainer = am4core.create("date-axis", am4core.Container);
  axisContainer.width = am4core.percent(100);
  axisContainer.height = am4core.percent(100);

  chart.bottomAxesContainer.parent = axisContainer;
  dateAxis.tooltip!.parent = axisContainer;
  dateAxis.renderer.ticks.template.parent = axisContainer;

  return { chart };
};

const createDateAxis = (chart: XYChart) => {
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.startLocation = 0.5;
  dateAxis.endLocation = 0.5;
  dateAxis.renderer.minGridDistance = 100;

  dateAxis.renderer.line.strokeOpacity = 0.5;
  dateAxis.renderer.line.strokeWidth = 5;
  dateAxis.renderer.line.stroke = am4core.color("#000000");

  dateAxis.renderer.ticks.template.disabled = false;
  dateAxis.renderer.ticks.template.strokeOpacity = 1;
  dateAxis.renderer.ticks.template.length = 10;

  dateAxis.renderer.labels.template.location = 0.5;
  dateAxis.renderer.labels.template.verticalCenter = "middle";
  dateAxis.renderer.labels.template.horizontalCenter = "middle";

  return dateAxis;
};

const createValueAxis = (chart: am4charts.XYChart): ValueAxis => {
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor(
    "alternativeBackground"
  );
  valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;

  valueAxis.renderer.inside = true;
  valueAxis.renderer.maxLabelPosition = 0.99;
  valueAxis.renderer.labels.template.padding(0, 2, 0, 2);
  valueAxis.renderer.labels.template.verticalCenter = "bottom";

  valueAxis.marginBottom = 10;

  return valueAxis;
};

const createSeries = (
  chart: XYChart,
  valueAxis: ValueAxis,
  id: string
): XYSeries => {
  let series: am4charts.XYSeries;
  if (!valueAxis) {
    const newValueAxis = createValueAxis(chart);
    series = createSeriesInstance(chart, newValueAxis, id);
  } else {
    series = createSeriesInstance(chart, valueAxis, id);
  }

  return series;
};

const createSeriesInstance = (
  chart: am4charts.XYChart,
  valueAxis: ValueAxis,
  id: string
) => {
  console.log({ valueAxis, id });

  const seriesInstance = chart.series.push(new am4charts.LineSeries());
  seriesInstance.strokeWidth = 1;

  seriesInstance.dataFields.valueY = `${id}`;
  seriesInstance.dataFields.dateX = "ts";
  seriesInstance.yAxis = valueAxis;
  seriesInstance.name = id;
  seriesInstance.tooltipText = `Значение: {valueY}`;

  return seriesInstance;
};

export { createChart, createSeries, createValueAxis };
