export type PayloadUpdateScheme = "name" | "scheme" | "svg";

export type DataPoint = {
  ts: Date;
};

export type DataTags = {
  [key: string]: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type Tags = {
  [key: string]: Tag;
};

export type Axis = {
  id: string;
  name: string;
  tags: string[];
};

export type Axes = {
  [key: string]: Axis;
};

export enum ModalEnum {
  settings = "settings",
}

type Props = {
  visible: boolean;
};

export type ModalProps = {
  type: ModalEnum;
  props: Props;
};

export type ModalState = {
  [key in ModalEnum]?: ModalProps;
};

export type SettingsState = {
  tagsCount: number;
  pointsCount: number;
  isRandomTagsNames: boolean;
};
