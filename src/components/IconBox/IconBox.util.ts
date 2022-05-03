// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
export const camelcaseToAmpersand = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1 & $2");
