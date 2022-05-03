// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { AppState, UserState } from "@stores";
import { setQueryString } from "@utils";
import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { HeaderAnchor, HeaderContainer, HeaderGroup } from "./Header.style";

const Header = () => {
  const [app, setApp] = useRecoilState(AppState);
  const user = useRecoilValue(UserState);
  const resetUser = useResetRecoilState(UserState);

  return (
    <HeaderContainer>
      <HeaderGroup>
        <div>ID : {user.username}</div>
      </HeaderGroup>
      <HeaderGroup>
        {user.isAdmin && (
          <>
            <HeaderAnchor
              onClick={() =>
                setApp((app) => ({ ...app, debugMode: !app.debugMode }))
              }
            >
              {app.debugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
            </HeaderAnchor>
            {app.page === "admin" ? (
              <HeaderAnchor
                onClick={() =>
                  setQueryString((qs) => ({ ...qs, page: undefined }))
                }
              >
                Go to Annotation Tool page
              </HeaderAnchor>
            ) : (
              <HeaderAnchor
                onClick={() =>
                  setQueryString((qs) => ({ ...qs, page: "admin" }))
                }
              >
                Go to Admin page
              </HeaderAnchor>
            )}
          </>
        )}
      </HeaderGroup>
    </HeaderContainer>
  );
};

export default Header;
