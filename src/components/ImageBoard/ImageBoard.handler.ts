// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconDataTransferType } from "@components";
import useIconAction from "@hooks/useIconAction";
import { AppState, ImageBoardState, TextOnMouseState } from "@stores";
import { throttle } from "@utils";
import React, { SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

const useHandler = () => {
  const app = useRecoilValue(AppState);
  const [imageBoard, setImageBoard] = useRecoilState(ImageBoardState);
  const resetTextOnMouse = useResetRecoilState(TextOnMouseState);
  const { putIcon, deleteIcon } = useIconAction();
  const imgRef = useRef<HTMLImageElement>(new Image());

  useEffect(() => {
    if (app.imageUrl) imgRef.current.src = app.imageUrl;
    setImageBoard((imageBoard) => ({
      ...imageBoard,
      imageLoading: true,
    }));
    imgRef.current.onload = () => {
      setImageBoard((imageBoard) => ({
        ...imageBoard,
        imageLoading: false,
      }));
    };
  }, [app.imageUrl]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.border = "2px solid #333";
    setImageBoard((imageBoard) => ({ ...imageBoard, isDragEnter: true }));
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.border = "";
    setImageBoard((imageBoard) => ({ ...imageBoard, isDragEnter: false }));
  };

  const onDragOver = useCallback(
    throttle((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "move";

      const { offsetX, offsetY } = e.nativeEvent;
      const x = offsetX / imageBoard.imageWidth;
      const y = offsetY / imageBoard.imageHeight;
      setImageBoard((imageBoard) => ({
        ...imageBoard,
        mousePoint: { x, y },
      }));
    }, 1000 / 60),
    [imageBoard.imageWidth, imageBoard.imageHeight]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.style.border = "";
    const {
      nativeEvent: { offsetX, offsetY },
      dataTransfer,
    } = e;
    const { iconType } = JSON.parse(
      dataTransfer.getData("application/json")
    ) as IconDataTransferType;

    putIcon(iconType, {
      x: offsetX / imageBoard.imageWidth,
      y: offsetY / imageBoard.imageHeight,
    });
    setImageBoard((imageBoard) => ({ ...imageBoard, isDragEnter: false }));
  };

  const onDragOverToWindow = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
  };

  const onDropToWindow = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { dataTransfer } = e;
    if (!dataTransfer) return;
    const { iconType } = JSON.parse(
      dataTransfer.getData("application/json")
    ) as IconDataTransferType;
    deleteIcon(iconType);
    resetTextOnMouse();
  };

  const onLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const borderWidth = 2;
    const originalImageWidth = e.currentTarget.naturalWidth;
    const originalImageHeight = e.currentTarget.naturalHeight;
    const imageHeight = e.currentTarget.offsetHeight - borderWidth * 2;
    const imageWidth = e.currentTarget.offsetWidth - borderWidth * 2;

    setImageBoard((imageBoard) => ({
      ...imageBoard,
      imageWidth,
      imageHeight,
      originalImageWidth,
      originalImageHeight,
      icons: {},
    }));
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = offsetX / imageBoard.imageWidth;
    const y = offsetY / imageBoard.imageHeight;
    setImageBoard((imageBoard) => ({
      ...imageBoard,
      mouseTracking: [
        ...imageBoard.mouseTracking,
        { x, y, timeAt: Date.now() - imageBoard.startedAt },
      ],
      mousePoint: { x, y },
    }));
  };

  return {
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onDragOverToWindow,
    onDropToWindow,
    onLoad,
    onMouseMove,
  };
};

export default useHandler;
