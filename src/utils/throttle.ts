// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
interface ThrottleOptions {
  trailing?: boolean;
}

const throttle = (
  func: (...args: any[]) => any,
  wait: number,
  option?: ThrottleOptions
) => {
  let timeout: NodeJS.Timeout | null = null;
  let trailingTimeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, wait);
    }
    if (option?.trailing) {
      if (trailingTimeout) clearTimeout(trailingTimeout);
      trailingTimeout = setTimeout(() => {
        trailingTimeout = null;
        func.apply(this, args);
      }, wait);
    }
  };
};

export default throttle;
