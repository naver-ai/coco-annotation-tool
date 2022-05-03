// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconRecord, IconType } from "@constants";
import React, { FC } from "react";
import { Container, Image, Name } from "./Icon.style";
import { capitalize } from "./Icon.utils";
import useHandler from "./Icon.handler";

interface IconProps {
  iconType: IconType;
  attached?: boolean;
  x?: number;
  y?: number;
  disabled?: boolean;
  displayName?: boolean;
}

const Icon: FC<IconProps> = (props) => {
  const { iconType, attached, x, y, disabled, displayName } = props;
  const { onMouseEnter, onMouseLeave, onDragStart, onDragEnd, onClick } =
    useHandler({
      iconType,
    });

  return (
    <Container>
      <Image
        draggable={!disabled}
        disabled={disabled}
        attached={attached}
        x={x}
        y={y}
        src={IconRecord[iconType]}
        alt={iconType}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
      {displayName && <Name>{capitalize(iconType)}</Name>}
    </Container>
  );
};

export default Icon;
