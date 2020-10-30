/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { XYChart } from "@amcharts/amcharts4/charts";

import {
  Axes,
  DataPoint,
  DataTags,
  ModalProps,
  ModalState,
  SettingsState,
  Tags,
} from "../types";
import { getRandomTagName } from "./utils";

export const createCoreStore = () => {
  return {
    isLoaded: 0,

    modalStates: null as ModalState | null,

    tagsCount: 10 as number,
    pointsCount: 100 as number,
    isRandomTagsNames: false,

    setSettings({ tagsCount, pointsCount, isRandomTagsNames }: SettingsState) {
      this.tagsCount = tagsCount;
      this.pointsCount = pointsCount;
      this.isRandomTagsNames = isRandomTagsNames;
    },

    changeStateModal(props: ModalProps) {
      if (!this.modalStates) {
        this.modalStates = { [props.type]: props };
      } else {
        this.modalStates[props.type] = props;
      }
    },

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

    tagsDictionary: {} as Tags,
    generateTags(tagsCount: number) {
      const tags = Array.from(
        { length: tagsCount },
        (v, key) => key + 1
      ).reduce((acc, key) => {
        const tag = {
          id: `tag-${key}`,
          name: this.isRandomTagsNames ? getRandomTagName() : `Tag-${key}`,
        };
        return {
          ...acc,
          [`tag-${key}`]: tag,
        };
      }, {} as Tags);
      console.log("tags", tags);
      this.tagsDictionary = tags;
    },

    isTagDraggingNow: false,
    setIsTagDraggingNow(value: boolean) {
      this.isTagDraggingNow = value;
    },

    axesDictionary: {} as Axes,
    setAxesDictionary(value: Axes) {
      this.axesDictionary = value;
    },
    axesOrder: [] as string[],
    setAxesOrder(value: string[]) {
      this.axesOrder = value;
    },
    generateAxes(axesCount: number) {
      const axes = Array.from(
        { length: axesCount },
        (v, key) => key + 1
      ).reduce((acc, key) => {
        return {
          ...acc,
          [`axis-${key}`]: {
            name: `Axis-${key}`,
            id: `axis-${key}`,
            tags: [this.tagsDictionary[`tag-${key}`].id],
          },
        };
      }, {} as Axes);
      const axesOrder = Object.keys(axes);
      console.log("axes", axes);

      this.axesOrder = axesOrder;
      this.axesDictionary = axes;
    },

    data: [] as DataPoint[],
    generateData({ tagsCount = 10, pointsCount = 100 }) {
      this.generateTags(tagsCount);
      this.generateAxes(tagsCount);
      const data: DataPoint[] = Array.from(
        { length: pointsCount },
        (v, key) => {
          return {
            ts: new Date(2020, 0, key),
            ...Object.keys(this.tagsDictionary).reduce(
              (acc, tag) => ({
                ...acc,
                [tag]: Math.round(Math.random() * 100) + 100,
                // Math.round((Math.random() < 0.5 ? 1 : -1) + key / 5),
              }),
              {} as DataTags
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
