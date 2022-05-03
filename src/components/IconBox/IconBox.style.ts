// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { GAP_WITH_EACH_ICON } from "@constants";
import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #eee;

  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & > * {
    &:first-child {
      margin-top: 16px;
    }
    margin-left: 16px;
    margin-right: 16px;
    &:last-child {
      margin-bottom: 16px;
    }
  }
`;

export const CategoryTitle = styled.div`
  max-width: fit-content;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  align-self: center;
`;

export const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;
export const CategoryIcons = styled.div`
  padding: 4px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${GAP_WITH_EACH_ICON}px;
`;

interface ChevronButtonProps {
  disabled?: boolean;
}

export const ChevronButton = styled.button<ChevronButtonProps>`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;

  & > img {
    width: calc(179px / 6);
    height: calc(324px / 6);
  }

  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.1;
        `
      : css`
          cursor: pointer;
          &:hover {
            transform: scale(1.1);
          }
        `}
`;

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  position: relative;
  align-self: stretch;
  height: 24px;
  background-color: #fff;
  border-radius: 4px;

  display: flex;
  justify-content: flex-start;

  & > div {
    background-color: #00a8ff;
    ${({ progress }) =>
      css`
        width: ${progress * 100}%;
      `}
    height: 100%;
    border-radius: 4px;
    transition: 0.3s ease-in-out width;
  }

  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: bold;
    color: #000;
  }
`;
