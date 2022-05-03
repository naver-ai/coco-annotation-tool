// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconDataTransferType } from "@components";
import { DRAG_ICON_OPACITY, DRAG_ICON_SIZE, IconType } from "@constants";
import useIconAction from "@hooks/useIconAction";
import { AppState, TextOnMouseState } from "@stores";
import React, { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { capitalize } from "./Icon.utils";

interface UseHandlerParams {
  iconType: IconType;
}

const useHandler = (params: UseHandlerParams) => {
  const { iconType } = params;
  const { deleteIcon } = useIconAction();
  const app = useRecoilValue(AppState);
  const setTextOnMouseState = useSetRecoilState(TextOnMouseState);

  const onMouseEnter = useCallback(() => {
    setTextOnMouseState((state) => ({
      ...state,
      text: capitalize(iconType),
      visible: true,
    }));
    document.body.style.cursor = "crosshair";
  }, []);

  const onMouseLeave = useCallback(() => {
    setTextOnMouseState((state) => ({
      ...state,
      text: "",
      visible: false,
    }));
    document.body.style.cursor = "unset";
  }, []);

  const onDragStart = useCallback((e: React.DragEvent<HTMLImageElement>) => {
    e.dataTransfer.effectAllowed = "move";

    const dragImage = new Image(DRAG_ICON_SIZE, DRAG_ICON_SIZE);
    dragImage.src = e.currentTarget.src;
    if (app.version === "improved")
      dragImage.style.opacity = `${DRAG_ICON_OPACITY}`;
    const dragContainer = document.createElement("div");
    dragContainer.appendChild(dragImage);
    document.getElementById("backstage")?.appendChild(dragContainer);
    e.dataTransfer.setDragImage(
      dragContainer,
      DRAG_ICON_SIZE / 2,
      DRAG_ICON_SIZE / 2
    );
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        iconType,
      } as IconDataTransferType)
    );
  }, []);

  const onDragEnd = useCallback(() => {
    setTextOnMouseState((state) => ({
      ...state,
      text: "",
      visible: false,
    }));
    (document.getElementById("backstage") as HTMLDivElement).innerHTML = "";
  }, []);

  const onClick = useCallback(() => {
    deleteIcon(iconType);
    setTextOnMouseState((state) => ({
      ...state,
      text: "",
      visible: false,
    }));
  }, []);

  return {
    onMouseEnter,
    onMouseLeave,
    onDragStart,
    onDragEnd,
    onClick,
  };
};

export default useHandler;
