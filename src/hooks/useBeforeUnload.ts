// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import React, { useCallback, useEffect } from "react";

export default (
  value?: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [beforeUnload, setBeforeUnload] = React.useState(value ?? false);

  const beforeUnloadHandler = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue =
      "Now uploading your annotation data to database server. Are you sure leave here?";
    return "Now uploading your annotation data to database server. Are you sure leave here?";
  }, []);

  useEffect(() => {
    if (beforeUnload) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
  }, [beforeUnload]);

  useEffect(() => {
    setBeforeUnload(value ?? false);
  }, [value]);

  return [beforeUnload, setBeforeUnload];
};
