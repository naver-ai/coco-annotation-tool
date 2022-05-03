// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { throttle } from "@utils";
import { useEffect, useState } from "react";

const useHandler = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMoveEvent = throttle(
      (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY }),
      1000 / 60,
      { trailing: true }
    );

    window.addEventListener("mousemove", mouseMoveEvent);
    window.addEventListener("drag", mouseMoveEvent, false);
    return () => {
      window.removeEventListener("mousemove", mouseMoveEvent);
      window.removeEventListener("drag", mouseMoveEvent, false);
    };
  }, []);

  return { position };
};

export default useHandler;
