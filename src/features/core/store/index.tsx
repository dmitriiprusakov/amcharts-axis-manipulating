import { XYChart } from "@amcharts/amcharts4/charts";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { DataItem } from "../types";

export const createCoreStore = () => {
  return {
    isLoaded: 0,

    chartInstance: null as XYChart | null,

    setChartInstance(value: XYChart) {
      this.chartInstance = value;
    },

    data: [] as DataItem[],

    generateData(parametersCount = 1, pointsCount = 100) {
      const data: DataItem[] = [];
      for (let i = 1; i <= pointsCount; i += 1) {
        const dataItem: DataItem = {
          ts: new Date(2020, 0, i), // getTime() to ts.
        };
        data.push(dataItem);
      }
      const valuedData = data.map((datePoint) => {
        const values = [] as number[];

        for (let i = 1; i <= parametersCount; i += 1) {
          let value = Math.round(Math.random() * 100) + 100;
          value += Math.round(
            (Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5
          );
          values.push(value);
        }
        return { ...datePoint, ...values };
      });
      console.log("valuedData", valuedData);

      this.data = valuedData;
    },
  };
};

export type CoreStore = ReturnType<typeof createCoreStore>;
