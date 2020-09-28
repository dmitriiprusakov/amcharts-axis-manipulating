import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { ValueAxis, XYChart } from "@amcharts/amcharts4/charts";

const interfaceColors = new am4core.InterfaceColorSet();

const createChart = (div: string): { chart: XYChart } => {
  const chart = am4core.create(div, am4charts.XYChart);

  chart.padding(0, 16, 0, 16);
  chart.leftAxesContainer.layout = "vertical";

  const dateAxis = createDateAxis(chart);

  const scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX = scrollbarX;
  chart.scrollbarX.startGrip.icon.disabled = true;
  chart.scrollbarX.endGrip.icon.disabled = true;

  const cursor = new am4charts.XYCursor();
  chart.cursor = cursor;
  chart.cursor.xAxis = dateAxis;

  return { chart };
};

const createDateAxis = (chart: XYChart) => {
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

  dateAxis.renderer.minGridDistance = 100;
  dateAxis.renderer.grid.template.location = 0;

  dateAxis.renderer.ticks.template.disabled = false;
  dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
  dateAxis.renderer.ticks.template.length = 4;

  dateAxis.renderer.labels.template.location = 0.5;
  dateAxis.renderer.labels.template.verticalCenter = "middle";
  dateAxis.renderer.labels.template.horizontalCenter = "middle";

  return dateAxis;
};

const createSeries = (chart: am4charts.XYChart, id: number) => {
  let series: am4charts.XYSeries;

  const valueAxis = createValueAxis(chart);

  series = createSeriesInstance(chart, valueAxis, id);

  return series;
};

const createValueAxis = (chart: am4charts.XYChart) => {
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor(
    "alternativeBackground"
  );
  valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;

  valueAxis.renderer.inside = true;
  valueAxis.renderer.maxLabelPosition = 0.99;
  valueAxis.renderer.labels.template.padding(0, 2, 0, 2);
  valueAxis.renderer.labels.template.verticalCenter = "bottom";

  return valueAxis;
};

const createSeriesInstance = (
  chart: am4charts.XYChart,
  valueAxis: ValueAxis,
  id: number
) => {
  const seriesInstance = chart.series.push(new am4charts.LineSeries());
  seriesInstance.strokeWidth = 1;

  seriesInstance.dataFields.valueY = `${id}`;
  seriesInstance.dataFields.dateX = "ts";
  seriesInstance.yAxis = valueAxis;
  seriesInstance.name = `${id}`;

  return seriesInstance;
};

export { createChart, createSeries };
