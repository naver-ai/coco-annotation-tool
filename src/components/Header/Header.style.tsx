// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: black;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 0px 4px;
  }
  margin: 0px -4px;
`;

export const LoadingCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border: 4px solid gray;
  border-top: 4px solid white;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const HeaderGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin: 0px 16px;
  }
  margin: 0px -16px;
`;

export const HeaderAnchor = styled.a`
  cursor: pointer;
  color: white;
  text-decoration: underline;
  &:hover {
    color: #ffc107;
  }
`;

export const HeaderText = styled.div`
  color: rgb(200, 200, 200);
`;
