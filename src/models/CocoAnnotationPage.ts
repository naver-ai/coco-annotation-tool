// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Point } from "@models";
import { ActionHistory, CategoryHistory } from "@stores";

export interface CocoAnnotationPage {
  cocoAnnotationID?: string;
  id: string;
  pageno: number;
  startedAt: number;
  createdAt?: number;
  endedAt?: number;
  annotation: {
    imageURL: string;
    imageWidth: number;
    imageHeight: number;
    originalImageWidth: number;
    originalImageHeight: number;
    mouseTracking: Point[];
    timeSpend: number;
    actionHistories: ActionHistory[];
    categoryHistories: CategoryHistory[];
  };
}
