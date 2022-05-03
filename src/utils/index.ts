// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
/* eslint-disable no-bitwise */
import { parse, stringify } from "query-string";
import throttle from "./throttle";

export { throttle };

export const getRandomElement = <T>(elements: T[]): T => {
  const random = Math.floor(Math.random() * elements.length);
  return elements[random];
};

export const getRandomElements = <T>(elements: T[], count: number): T[] => {
  const tmp = [...elements];
  const randomElements: T[] = [];
  for (let i = 0; i < count; i += 1) {
    if (tmp.length === 0) {
      return randomElements;
    }
    const random = Math.floor(Math.random() * tmp.length);
    randomElements.push(tmp[random]);
    tmp.splice(random, 1);
  }
  return randomElements;
};

export const setQueryString = (value: (queryString: any) => any) => {
  const queryString = parse(window.location.search);
  const newQueryString = value(queryString);
  window.location.search = `?${stringify(newQueryString)}`;
};

export const capitalize = (word: string) =>
  `${word?.[0]?.toUpperCase()}${word.slice(1)}`;

export const generateSurveyCode = (): string => {
  const customHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash &= hash;
    }
    return (hash + 0xffffff).toString(16).slice(-6).toUpperCase();
  };

  const { hitId, workerId, assignmentId } = parse(
    window.location.search
  ) as Record<string, string>;

  return customHash(`${hitId}-${workerId}-${assignmentId}`);
};

export const deleteKey = (from: Record<string, unknown>, key: string) =>
  Object.fromEntries(Object.entries(from).filter((each) => each[0] !== key));

export const generateUUID = (): string => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};
