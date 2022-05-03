// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Header, MagnifierOnMouse, TextOnMouse } from "@components";
import { AnnotatorPage } from "@pages";
import { AppState, UserState } from "@stores";
import Amplify from "aws-amplify";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import awsconfig from "./aws-exports";  // Not available in the public repository, for a good reason :)

Amplify.configure(awsconfig);

const App = () => {
  const app = useRecoilValue(AppState);
  const user = useRecoilValue(UserState);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <TextOnMouse />
      {app.version === "improved" && <MagnifierOnMouse />}
      {(user.isAdmin || app.page === "admin") && user.id?.length > 0 && (
        <Header />
      )}
      {app.page === "annotator" ? (
        <AnnotatorPage />
      ) : null}
    </>
  );
};

export default App;
