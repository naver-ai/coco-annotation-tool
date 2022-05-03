// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { CocoAnnotation, CocoHIT } from "@models";

export default async (cocoAnnotation: Partial<CocoAnnotation>) => {
  const { hitDatasetName, cocoHitID, ...annotation } = cocoAnnotation;

  const hit: CocoHIT = await API.post(
    "CocoAPI",
    `/api/coco/${hitDatasetName}/hits/${cocoHitID}/annotations`,
    { body: { ...annotation } }
  );
  return hit;
};
