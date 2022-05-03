// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { IconBox, ImageBoard, ImageContain } from "@components";
import { useBeforeUnload } from "@hooks";
import { useEffect } from "react";
import useHandler from "./AnnotatorPage.handler";
import {
  Code,
  Container,
  Horizontal,
  OverlayLoading,
  Spacer,
  SubmitButton,
} from "./AnnotatorPage.style";

const AnnotatorPage = () => {
  const { app, imageBoard, fetchHIT, submitHandler } = useHandler();
  useBeforeUnload(true);

  useEffect(() => {
    fetchHIT();
  }, []);

  if (app.surveyCode) {
    return (
      <Container>
        <h1>Thank you!</h1>
        <h2>
          Your survey code is{" "}
          <span style={{ color: "red" }}>{app.surveyCode}</span>
        </h2>
        <p>
          You&rsquo;ve submitted all annotations.
          <br />
          Put this survey code in AWS Mturk survey form.
        </p>
      </Container>
    );
  }

  if (app.error) {
    return (
      <Container>
        <h1>Error</h1>
        <h2>{app.error}</h2>
      </Container>
    );
  }

  return (
    <Container>
      <p>
        Please drag and drop icons from the bottom panel to matching objects in
        the image. If and icon matches multiple objects you can drag the icon
        onto any of the objects. There area 11 sets of objects to drag onto the
        image. Use the buttons or arrow keys to cycle through them. There are
        total of {app.totalSubmitCount} images to label.
      </p>

      <Horizontal>
        <Spacer />
        <ImageBoard />
        <Spacer />
        <ImageContain />
      </Horizontal>
      <IconBox />

      {app.debugMode && (
        <>
          <h3>Data Example (For Debugging)</h3>
          <Code>
            <pre>{JSON.stringify(imageBoard, null, 2)}</pre>
          </Code>
        </>
      )}

      <SubmitButton type="button" onClick={submitHandler}>
        {app.submitting ? "Submitting..." : "Submit"}
      </SubmitButton>
      <div>
        {app.submitCount} page(s) / {app.totalSubmitCount} pages
      </div>

      {(app.loading || app.submitting) && (
        <OverlayLoading>
          <div />
        </OverlayLoading>
      )}
    </Container>
  );
};

export default AnnotatorPage;
