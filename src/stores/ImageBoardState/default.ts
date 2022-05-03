// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IImageBoardState } from "./type";

const DefaultImageBoardState: IImageBoardState = {
  imageLoading: true,
  imageWidth: 0,
  imageHeight: 0,
  originalImageWidth: 0,
  originalImageHeight: 0,
  icons: {},
  categoryIndex: 0,
  actionHistories: [],
  categoryHistories: [],
  mouseTracking: [],
  startedAt: Date.now(),

  isDragEnter: false,
  mousePoint: { x: 0, y: 0 },
};

export default DefaultImageBoardState;
