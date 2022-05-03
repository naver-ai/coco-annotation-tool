// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconType } from "@constants";
import { Point } from "@models";

interface PointWithTime extends Point {
  timeAt: number;
}

type ActionType = "add" | "move" | "remove";
export interface ActionHistory {
  actionType: ActionType;
  iconType: IconType;
  pointFrom?: Point;
  pointTo?: Point;
  timeAt: number;
}

export interface CategoryHistory {
  usingKeyboard: boolean;
  categoryIndex: number;
  categoryName: string;
  timeAt: number;
}

export type IImageBoardState = {
  imageLoading: boolean;
  imageWidth: number;
  imageHeight: number;
  originalImageWidth: number;
  originalImageHeight: number;
  icons: Partial<Record<IconType, Point>>;
  categoryIndex: number;
  actionHistories: ActionHistory[];
  categoryHistories: CategoryHistory[];
  mouseTracking: PointWithTime[];
  startedAt: number;

  isDragEnter: boolean;
  mousePoint: Point;
};
