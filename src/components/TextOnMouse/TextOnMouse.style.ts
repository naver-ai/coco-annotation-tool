// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import styled from "styled-components";

interface ContainerProps {
  x: number;
  y: number;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  z-index: 9999;

  user-select: none;
  pointer-events: none;

  padding: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-weight: bold;
  border-radius: 4px;

  transform: translate(-50%, calc(50% + 4px));
`;
