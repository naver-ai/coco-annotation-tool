// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IMAGE_BOARD_HEIGHT } from "@constants";
import styled from "styled-components";

export const Container = styled.div`
  flex-shrink: 1;
  position: relative;
  min-width: 100px;
  max-width: 100%;
  height: ${IMAGE_BOARD_HEIGHT}px;
`;

export const Image = styled.img`
  border: 2px solid #ddd;
  box-sizing: content-box;
  user-select: none;
  display: block;
  height: 100%;
  max-width: 100%;
  max-height: ${IMAGE_BOARD_HEIGHT}px;
`;

export const Loading = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ddd;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  justify-self: center;
  align-self: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
