// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { TextOnMouseState } from "@stores";
import { throttle } from "@utils";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const useHandler = () => {
  const [textOnMouseState, setTextOnMouseState] =
    useRecoilState(TextOnMouseState);
  const { visible = false, text = "" } = textOnMouseState;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMoveEvent = throttle(
      (e: MouseEvent) => {
        if (e.x > 0 && e.y > 0) {
          setPosition({ x: e.clientX, y: e.clientY });
        } else {
          setTextOnMouseState((state) => ({ ...state, visible: false }));
        }
      },
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

  return { visible, position, text };
};

export default useHandler;
