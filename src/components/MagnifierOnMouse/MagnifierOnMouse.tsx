// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { MAGNIFIER_RADIUS } from "@constants";
import { AppState, ImageBoardState } from "@stores";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import useHandler from "./MagnifierOnMouse.handler";
import { Aim, Container, Scaler } from "./MagnifierOnMouse.style";

const MagnifierOnMouse: FC = () => {
  const app = useRecoilValue(AppState);
  const imageBoard = useRecoilValue(ImageBoardState);
  const { position } = useHandler();

  if (imageBoard.isDragEnter)
    return (
      <Container x={position.x} y={position.y}>
        <Scaler>
          <img
            src={app.imageUrl}
            alt=""
            style={{
              position: "absolute",
              width: imageBoard.imageWidth,
              height: imageBoard.imageHeight,
              transform: `translate(${-(
                imageBoard.mousePoint.x * imageBoard.imageWidth -
                MAGNIFIER_RADIUS
              )}px, ${-(
                imageBoard.mousePoint.y * imageBoard.imageHeight -
                MAGNIFIER_RADIUS
              )}px)`,
            }}
          />
        </Scaler>
        <Aim />
      </Container>
    );
  return <></>;
};

export default MagnifierOnMouse;
