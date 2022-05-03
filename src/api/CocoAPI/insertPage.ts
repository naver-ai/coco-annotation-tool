// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { CocoAnnotationPage, CocoHIT } from "@models";

interface InsertPageParams {
  hitDatasetName: string;
  cocoAnnotationId: string;
  page: CocoAnnotationPage;
  isDone?: boolean;
}

export default async (params: InsertPageParams) => {
  const { hitDatasetName, cocoAnnotationId, page, isDone = false } = params;

  const endedAt = Date.now();
  const hit: CocoHIT = await API.put(
    "CocoAPI",
    `/api/coco/${hitDatasetName}/annotations/${cocoAnnotationId}`,
    { body: { page, endedAt, isDone } }
  );
  return hit;
};
