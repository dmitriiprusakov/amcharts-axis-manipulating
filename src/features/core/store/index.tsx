/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { XYChart } from "@amcharts/amcharts4/charts";

import { DataPoint, Tag } from "../types";

export const createCoreStore = () => {
  return {
    isLoaded: 0,

    chartInstance: null as XYChart | null,

    setChartInstance(value: XYChart) {
      this.chartInstance = value;
    },

    tags: [] as Tag[],
    generateTags(tagsCount: number) {
      const tags = Array.from({ length: tagsCount }, (v, key) => {
        return {
          id: key,
          name: `tag-${key}`,
        };
      });
      console.log("tags", tags);
      this.tags = tags;
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
