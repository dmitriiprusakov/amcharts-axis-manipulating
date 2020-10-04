/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { XYChart } from "@amcharts/amcharts4/charts";

import { Axes, DataPoint, Tag, Tags } from "../types";

export const createCoreStore = () => {
  return {
    isLoaded: 0,

    isSiderCollapsed: false,
    isSiderCollapsingNow: false,
    setSiderCollapsed(value: boolean) {
      this.isSiderCollapsingNow = true;

      this.isSiderCollapsed = value;
      setTimeout(() => {
        this.isSiderCollapsingNow = false;
      }, 1000); // timing like sidebar transition duration
    },

    chartInstance: null as XYChart | null,

    setChartInstance(value: XYChart) {
      this.chartInstance = value;
    },

    axesOrder: [] as string[],
    setAxesOrder(value: string[]) {
      this.axesOrder = value;
    },

    axes: {} as Axes,

    tags: {} as Tags,
    generateTags(tagsCount: number) {
      const axes = Array.from(
        { length: tagsCount },
        (v, key) => key + 1
      ).reduce((acc, key) => {
        const tag = {
          id: `tag-${key}`,
          name: `Tag-${key}`,
        };
        return {
          ...acc,
          [`axis-${key}`]: {
            name: `Axis-${key}`,
            id: `axis-${key}`,
            tags: { [`tag-${key}`]: tag },
          },
        };
      }, {} as Axes);

      const axesOrder = Object.keys(axes);
      console.log("axes", axes);
      console.log("axesOrder", axesOrder);

      this.axesOrder = axesOrder;
      this.axes = axes;
    },

    data: [] as DataPoint[],
    generateData({ parametersCount = 10, pointsCount = 100 }) {
      this.generateTags(parametersCount);
      const data: DataPoint[] = Array.from(
        { length: pointsCount },
        (v, key) => {
          return {
            ts: new Date(2020, 0, key),
            ...Object.keys(this.tags).map(
              (tag) =>
                Math.round(Math.random() * 100) +
                100 +
                Math.round(
                  (Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + key / 5
                )
            ),
          };
        }
      );
      console.log("data", data);
      this.data = data;
    },
  };
};

export type CoreStore = ReturnType<typeof createCoreStore>;
