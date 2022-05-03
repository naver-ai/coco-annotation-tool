// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconCategoryNames, IconCategoryRecord } from "@constants";
import { ImageBoardState, TextOnMouseState } from "@stores";
import { useCallback, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const useHandler = () => {
  const [imageBoard, setImageBoard] = useRecoilState(ImageBoardState);
  const setTextOnMouse = useSetRecoilState(TextOnMouseState);

  const currentCategoryName = useMemo(
    () => IconCategoryNames[imageBoard.categoryIndex],
    [imageBoard.categoryIndex]
  );

  const currentCategoryIcons = useMemo(
    () => IconCategoryRecord[currentCategoryName],
    [currentCategoryName]
  );

  const hasPrevious = useMemo(
    () => imageBoard.categoryIndex > 0,
    [imageBoard.categoryIndex]
  );

  const prevCategory = useCallback((usingKeyboard = false) => {
    if (typeof usingKeyboard !== "boolean")
      throw new Error("usingKeyboard must be a boolean");
    setImageBoard((imageBoard) =>
      imageBoard.categoryIndex > 0
        ? {
            ...imageBoard,
            categoryIndex: imageBoard.categoryIndex - 1,
            categoryHistories: [
              ...imageBoard.categoryHistories,
              {
                categoryIndex: imageBoard.categoryIndex - 1,
                categoryName: IconCategoryNames[imageBoard.categoryIndex - 1],
                usingKeyboard,
                timeAt: Date.now() - imageBoard.startedAt,
              },
            ],
          }
        : imageBoard
    );
    setTextOnMouse((textOnMouse) => ({ ...textOnMouse, visible: false }));
  }, []);

  const hasNext = useMemo(
    () => imageBoard.categoryIndex < IconCategoryNames.length - 1,
    [imageBoard.categoryIndex]
  );

  const nextCategory = useCallback((usingKeyboard = false) => {
    if (typeof usingKeyboard !== "boolean")
      throw new Error("usingKeyboard must be a boolean");
    setImageBoard((imageBoard) =>
      imageBoard.categoryIndex < IconCategoryNames.length - 1
        ? {
            ...imageBoard,
            categoryIndex: imageBoard.categoryIndex + 1,
            categoryHistories: [
              ...imageBoard.categoryHistories,
              {
                categoryIndex: imageBoard.categoryIndex + 1,
                categoryName: IconCategoryNames[imageBoard.categoryIndex + 1],
                usingKeyboard,
                timeAt: Date.now() - imageBoard.startedAt,
              },
            ],
          }
        : imageBoard
    );
    setTextOnMouse((textOnMouse) => ({ ...textOnMouse, visible: false }));
  }, []);

  return {
    categoryIndex: imageBoard.categoryIndex,
    currentCategoryName,
    currentCategoryIcons,
    hasPrevious,
    prevCategory,
    hasNext,
    nextCategory,
  };
};

export default useHandler;
