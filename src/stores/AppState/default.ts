// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { generateUUID } from "@utils";
import { parse } from "query-string";
import { AnnotationVersion } from "@constants";
import { IAppAtom, Page } from "./type";

const {
  assignmentId = undefined,
  workerId = undefined,
  hitId = undefined,
  page = "annotator" as Page,
  hitDatasetName = undefined,
  cocoHitId = undefined,
  version = "baseline" as AnnotationVersion,
} = parse(window.location.search);

let error: string | undefined;
if (typeof hitDatasetName === "undefined") {
  error = "hitDatasetName is undefined";
} else if (typeof cocoHitId === "undefined") {
  error = "cocoHitId is undefined";
} else if (typeof workerId === "undefined") {
  error = "workerId is undefined";
}

console.log("hitDatasetName:", hitDatasetName);
console.log("cocoHitId:", cocoHitId);
console.log("workerId:", workerId);

const DefaultAppState: IAppAtom = {
  loading: true,
  error,
  submitCount: 1,
  submitting: false,
  debugMode: false,
  assignmentId: assignmentId as string | undefined,
  workerId: workerId as string,
  hitId: hitId as string | undefined,
  page: page as Page,
  hitDatasetName: hitDatasetName as string,
  cocoHitId: cocoHitId as string,
  cocoHit: undefined,
  cocoAnnotationId: generateUUID(),
  surveyCode: undefined,
  startedAt: Date.now(),
  version: version as AnnotationVersion,
};

export default DefaultAppState;
