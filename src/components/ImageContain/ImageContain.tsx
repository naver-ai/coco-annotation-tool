// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconRecord, IconType } from "@constants";
import { ImageBoardState } from "@stores";
import { capitalize } from "@utils";
import React from "react";
import { useRecoilValue } from "recoil";
import { Container, IconGrid, Title } from "./ImageContain.style";

const ImageContain = () => {
  const imageBoard = useRecoilValue(ImageBoardState);

  return (
    <Container>
      <Title>Image contains</Title>
      <IconGrid>
        {Object.getOwnPropertyNames(imageBoard.icons).map((iconType) => {
          return (
            <img
              key={iconType}
              src={IconRecord[iconType as IconType]}
              alt={capitalize(iconType)}
            />
          );
        })}
      </IconGrid>
    </Container>
  );
};

export default ImageContain;
