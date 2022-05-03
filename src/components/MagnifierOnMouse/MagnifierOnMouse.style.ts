// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { MAGNIFIER_RADIUS, MAGNIFIER_SCALE } from "@constants";
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

  width: ${MAGNIFIER_RADIUS * 2}px;
  height: ${MAGNIFIER_RADIUS * 2}px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ddd;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  transform: translate(-50%, calc(-100% - 20px));
`;

export const Scaler = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: scale(${MAGNIFIER_SCALE});
  transform-origin: center;
`;

export const Aim = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background-color: #ff0000;
  border: 0.5px solid #000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;
