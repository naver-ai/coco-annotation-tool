// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { atom } from "recoil";
import DefaultTextOnMouseState from "./default";
import { ITextOnMouseState } from "./type";

export default atom<ITextOnMouseState>({
  key: "textOnMouseState",
  default: DefaultTextOnMouseState,
});
