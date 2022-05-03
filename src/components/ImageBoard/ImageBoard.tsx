// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Icon } from "@components";
import { IconType } from "@constants";
import { AppState, ImageBoardState } from "@stores";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Loading, Container, Image } from "./ImageBoard.style";
import useHandler from "./ImageBoard.handler";

const ImageBoard = () => {
  const app = useRecoilValue(AppState);
  const imageBoard = useRecoilValue(ImageBoardState);
  const {
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onDragOverToWindow,
    onDropToWindow,
    onLoad,
    onMouseMove,
  } = useHandler();

  useEffect(() => {
    window.addEventListener("dragover", onDragOverToWindow);
    window.addEventListener("drop", onDropToWindow);
    return () => {
      window.removeEventListener("dragover", onDragOverToWindow);
      window.removeEventListener("drop", onDropToWindow);
    };
  }, [onDragOverToWindow, onDropToWindow]);

  return (
    <Container>
      {Object.getOwnPropertyNames(imageBoard.icons).map((iconType) => {
        const { x, y } = imageBoard.icons[iconType as IconType] ?? {
          x: 0,
          y: 0,
        };
        return (
          <Icon
            key={iconType}
            attached
            iconType={iconType as IconType}
            x={x * imageBoard.imageWidth}
            y={y * imageBoard.imageHeight}
          />
        );
      })}
      {imageBoard.imageLoading ? (
        <Loading />
      ) : (
        <Image
          src={app.imageUrl}
          alt=""
          onLoad={onLoad}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onMouseMove={onMouseMove}
        />
      )}
    </Container>
  );
};

export default ImageBoard;
