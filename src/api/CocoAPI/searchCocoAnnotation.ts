// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import API from "@aws-amplify/api";
import { CocoAnnotation } from "@models";

interface CocoAnnotationWithPageCount extends CocoAnnotation {
  pageCount: number;
}

interface SearchCocoAnnotationsRequest {
  hitDatasetName: string;
  cocoHitID: string;
  workerID: string;
}

export default async (request: SearchCocoAnnotationsRequest) => {
  const { hitDatasetName, cocoHitID, workerID } = request;

  const hit: CocoAnnotationWithPageCount[] = await API.get(
    "CocoAPI",
    `/api/coco/${hitDatasetName}/hits/${cocoHitID}/annotations`,
    {
      queryStringParameters: {
        workerID,
      },
    }
  );
  return hit;
};
