// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { CocoAnnotationPage } from "@models";

export interface CocoAnnotation {
  hitDatasetName?: string;
  cocoHitID?: string;
  id: string;
  annotatorID: string;
  workerID: string;
  hitID: string;
  assignmentID: string;
  pages?: CocoAnnotationPage[];
  createdAt?: number;
  startedAt: number;
  isDone?: boolean;
}
