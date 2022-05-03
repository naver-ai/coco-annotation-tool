// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { searchCocoAnnotation } from "@api";
import { CocoAnnotation, CocoAnnotationPage, CocoHIT } from "@models";
import { IAppSelector } from "@stores/AppState/type";
import { IImageBoardState } from "@stores/ImageBoardState/type";
import { generateUUID } from "@utils";

export const initCocoAnnotation = (
  app: IAppSelector,
  annotatorID?: string
): Partial<CocoAnnotation> => {
  return {
    id: app.cocoAnnotationId,
    annotatorID: annotatorID ?? app.workerId,
    assignmentID: app.assignmentId,
    hitID: app.hitId,
    workerID: app.workerId,
    cocoHitID: app.cocoHit?.id,
    hitDatasetName: app.cocoHit?.hitDatasetName,
    startedAt: app.startedAt,
  };
};

export const initCocoAnnotationPage = (
  app: IAppSelector,
  imageBoard: IImageBoardState
): CocoAnnotationPage => {
  return {
    id: generateUUID(),
    annotation: {
      actionHistories: imageBoard.actionHistories,
      categoryHistories: imageBoard.categoryHistories,
      imageHeight: imageBoard.imageHeight,
      imageWidth: imageBoard.imageWidth,
      originalImageWidth: imageBoard.originalImageWidth,
      originalImageHeight: imageBoard.originalImageHeight,
      imageURL: app.imageUrl as string,
      mouseTracking: imageBoard.mouseTracking,
      timeSpend: Date.now() - imageBoard.startedAt,
    },
    pageno: app.cocoHitPage?.pageno as number,
    startedAt: imageBoard.startedAt,
  };
};

interface ValidateWorkerParams {
  app: IAppSelector;
  cocoHit: CocoHIT;
}
interface ValidateWorkerResult {
  isDone: boolean;
  isSameAssignment: boolean;
  initialSubmitCount: number;
  cocoAnnotationId: string;
}
export const validateWorker = async (params: ValidateWorkerParams) => {
  const { app, cocoHit } = params;
  const result: ValidateWorkerResult = {
    isDone: false,
    isSameAssignment: false,
    initialSubmitCount: app.submitCount,
    cocoAnnotationId: app.cocoAnnotationId,
  };

  const cocoAnnotations = await searchCocoAnnotation({
    hitDatasetName: app.hitDatasetName,
    cocoHitID: app.cocoHitId,
    workerID: app.workerId,
  });

  // If the worker has already done this hitDatasetName,
  const doneOne = cocoAnnotations.find(({ isDone }) => isDone);
  if (cocoHit.isUnique && !!doneOne) {
    result.isDone = true;
    result.isSameAssignment = doneOne.cocoHitID === cocoHit.id;
    return result;
  }

  // If the worker has already submitted the annotation,
  const sameOne = cocoAnnotations.find(
    ({ cocoHitID }) => cocoHitID === app.cocoHitId
  );
  if (sameOne) {
    result.initialSubmitCount = sameOne.pageCount + 1;
    result.cocoAnnotationId = sameOne.id;
  }

  return result;
};
