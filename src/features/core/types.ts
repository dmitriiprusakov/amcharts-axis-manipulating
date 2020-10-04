export type PayloadUpdateScheme = "name" | "scheme" | "svg";

export type DataPoint = {
  ts: Date;
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
  tags: Tags;
};

export type Axes = {
  [key: string]: Axis;
};
