// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { GAP_WITH_EACH_ICON, IMAGE_BOARD_HEIGHT } from "@constants";
import styled from "styled-components";

const PADDING = 12;
const ICON_SIZE = 60;

export const Container = styled.div`
  flex-shrink: 0;
  align-self: stretch;
  background-color: #eee;
  overflow-y: auto;
  height: ${IMAGE_BOARD_HEIGHT}px;

  & > * {
    margin-left: ${PADDING}px;
    margin-right: ${PADDING}px;
  }

  &:first-child {
    margin-top: ${PADDING}px;
  }

  &:last-child {
    margin-bottom: ${PADDING}px;
  }
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const IconGrid = styled.div`
  margin: 8px;
  display: flex;
  flex-wrap: wrap;
  width: ${ICON_SIZE * 2 + GAP_WITH_EACH_ICON}px;
  gap: ${GAP_WITH_EACH_ICON}px;

  & > img {
    width: ${ICON_SIZE}px;
    height: ${ICON_SIZE}px;
  }
`;
