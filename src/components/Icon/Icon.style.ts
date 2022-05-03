// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { ICON_SIZE } from "@constants";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface ImageProps {
  attached?: boolean;
  x?: number;
  y?: number;
  disabled?: boolean;
}

export const Image = styled.img<ImageProps>`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  cursor: pointer;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.3;
        `
      : css`
          &:hover {
            transform: scale(1.1);
          }
        `}

  ${({ disabled, attached = false, x = 0, y = 0 }) =>
    attached &&
    css`
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      transform: translate(-50%, -50%) scale(0.5);

      ${!disabled &&
      css`
        &:hover {
          transform: translate(-50%, -50%) scale(0.7);
        }
      `}
    `}
`;

export const Name = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: #000;
  margin-top: 5px;
  text-align: center;
`;
