// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationVersion } from "@constants";
import { CocoHIT, CocoHITPage } from "@models";

export type Page = "annotator" | "admin";

export type IAppAtom = {
  loading: boolean;
  submitting: boolean;
  error?: string;
  submitCount: number;
  debugMode: boolean;
  assignmentId?: string;
  workerId: string;
  hitId?: string;
  page: Page;
  hitDatasetName: string;
  cocoHitId: string;
  cocoHit?: CocoHIT;
  cocoAnnotationId: string;
  surveyCode?: string;
  startedAt: number;
  version: AnnotationVersion;
};

export interface IAppSelector extends IAppAtom {
  imageUrl?: string;
  totalSubmitCount?: number;
  cocoHitPage?: CocoHITPage;
}
