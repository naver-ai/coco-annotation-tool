// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { createCocoAnnotation, getCocoHit, insertPage } from "@api";
import { IconCategoryNames } from "@constants";
import { CocoHIT } from "@models";
import { AppState, ImageBoardState, UserState } from "@stores";
import { generateSurveyCode } from "@utils";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  initCocoAnnotation,
  initCocoAnnotationPage,
  validateWorker,
} from "./AnnotatorPage.utils";

const useHandler = () => {
  const [app, setApp] = useRecoilState(AppState);
  const user = useRecoilValue(UserState);
  const [imageBoard, setImageBoard] = useRecoilState(ImageBoardState);
  const resetImageBoard = useResetRecoilState(ImageBoardState);

  const fetchHIT = async () => {
    if (!app.hitDatasetName || !app.cocoHitId || !app.workerId) return;
    setApp((app) => ({ ...app, loading: true }));
    try {
      const cocoHit = await getCocoHit(app.hitDatasetName, app.cocoHitId);

      const { cocoAnnotationId, initialSubmitCount, isDone, isSameAssignment } =
        await validateWorker({ cocoHit, app });
      if (isDone) {
        if (isSameAssignment) {
          setApp((app) => ({ ...app, surveyCode: generateSurveyCode() }));
        } else {
          setApp((app) => ({
            ...app,
            error:
              "You have already completed one of our HITs. We do not accept more than 1 HIT per worker.",
          }));
        }
      } else {
        setApp((app) => ({
          ...app,
          submitCount: initialSubmitCount,
          cocoAnnotationId,
          cocoHit,
        }));
      }
    } catch (error: any) {
      setApp((app) => ({
        ...app,
        error: error?.response?.data?.error ?? error.message,
      }));
    } finally {
      setApp((app) => ({
        ...app,
        loading: false,
      }));
    }
  };

  const submitHandler = async () => {
    if (
      !imageBoard.categoryHistories.some(
        (each) => each.categoryIndex >= IconCategoryNames.length - 1
      )
    ) {
      alert(
        "You need to traverse through all 11 categories to submit the work."
      );
      return;
    }

    try {
      setApp((app) => ({ ...app, submitting: true }));

      const { isDone, isSameAssignment } = await validateWorker({
        app,
        cocoHit: app.cocoHit as CocoHIT,
      });
      if (isDone) {
        if (isSameAssignment) {
          setApp((app) => ({ ...app, surveyCode: generateSurveyCode() }));
        } else {
          setApp((app) => ({
            ...app,
            error:
              "You have already completed one of our HITs. We do not accept more than 1 HIT per worker.",
          }));
        }
      }

      if (app.submitCount === 1) {
        await createCocoAnnotation(initCocoAnnotation(app, user.username));
      }
      await insertPage({
        cocoAnnotationId: app.cocoAnnotationId,
        page: initCocoAnnotationPage(app, imageBoard),
        hitDatasetName: app.hitDatasetName,
        isDone:
          !!app.totalSubmitCount && app.submitCount >= app.totalSubmitCount,
      });

      resetImageBoard();
      setImageBoard((imageBoard) => ({ ...imageBoard, startedAt: Date.now() }));
      if (app.totalSubmitCount && app.submitCount >= app.totalSubmitCount) {
        setApp((app) => ({ ...app, surveyCode: generateSurveyCode() }));
        return;
      }
      setApp((app) => ({ ...app, submitCount: app.submitCount + 1 }));
    } catch (error: any) {
      alert(error?.response?.data?.error ?? error.message);
    } finally {
      setApp((app) => ({ ...app, submitting: false }));
    }
  };

  return {
    app,
    imageBoard,
    fetchHIT,
    submitHandler,
  };
};

export default useHandler;
