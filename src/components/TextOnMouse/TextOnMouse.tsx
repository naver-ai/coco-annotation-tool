// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import React, { FC } from "react";
import useHandler from "./TextOnMouse.handler";
import { Container } from "./TextOnMouse.style";

const TextOnMouse: FC = () => {
  const { visible, position, text } = useHandler();

  if (visible)
    return (
      <Container x={position.x} y={position.y}>
        {text}
      </Container>
    );
  return <></>;
};

export default TextOnMouse;
