// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconType } from "@constants";
import { Point } from "@models";
import { ImageBoardState } from "@stores";
import { deleteKey } from "@utils";
import { useSetRecoilState } from "recoil";

const useIconAction = () => {
  const setImageBoard = useSetRecoilState(ImageBoardState);

  const putIcon = (iconType: IconType, droppedPoint: Point) => {
    setImageBoard((imageBoard) => {
      const previousPoint = imageBoard.icons[iconType]
        ? {
            x: imageBoard.icons[iconType]?.x ?? 0,
            y: imageBoard.icons[iconType]?.y ?? 0,
          }
        : undefined;

      return {
        ...imageBoard,
        icons: {
          ...imageBoard.icons,
          [iconType]: {
            ...imageBoard.icons[iconType],
            ...droppedPoint,
          },
        },
        actionHistories: [
          ...imageBoard.actionHistories,
          {
            actionType: previousPoint ? "move" : "add",
            pointFrom: previousPoint,
            pointTo: droppedPoint,
            iconType,
            timeAt: new Date().getTime() - imageBoard.startedAt,
          },
        ],
      };
    });
  };

  const deleteIcon = (iconType: IconType) => {
    setImageBoard((imageBoard) => {
      if (!imageBoard.icons[iconType]) return imageBoard;
      const previousPoint = {
        x: imageBoard.icons[iconType]?.x ?? 0,
        y: imageBoard.icons[iconType]?.y ?? 0,
      };
      return {
        ...imageBoard,
        icons: deleteKey(imageBoard.icons, iconType),
        actionHistories: [
          ...imageBoard.actionHistories,
          {
            actionType: "remove",
            iconType,
            pointFrom: previousPoint,
            pointTo: undefined,
            timeAt: new Date().getTime() - imageBoard.startedAt,
          },
        ],
      };
    });
  };

  return {
    putIcon,
    deleteIcon,
  };
};

export default useIconAction;
