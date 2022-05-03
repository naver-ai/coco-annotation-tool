// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { atom } from "recoil";
import DefaultImageBoardState from "./default";
import { IImageBoardState, ActionHistory, CategoryHistory } from "./type";

const ImageBoardState = atom<IImageBoardState>({
  key: "ImageBoardState",
  default: DefaultImageBoardState,
});

export default ImageBoardState;
export type { ActionHistory, CategoryHistory };
