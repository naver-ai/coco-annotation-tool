// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { CocoHIT } from "@models";

export default async (hitDatasetName: string, cocoHitID: string) => {
  const hit: CocoHIT = await API.get(
    "CocoAPI",
    `/api/coco/${hitDatasetName}/hits/${cocoHitID}`,
    {}
  );
  return hit;
};
