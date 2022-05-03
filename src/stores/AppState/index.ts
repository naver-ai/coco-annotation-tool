// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { atom, DefaultValue, selector } from "recoil";
import DefaultAppState from "./default";
import { IAppAtom, IAppSelector } from "./type";

const AppAtom = atom<IAppAtom>({
  key: "AppAtom",
  default: DefaultAppState,
});

const AppState = selector<IAppSelector>({
  key: "AppState",
  get: ({ get }) => {
    const appState: IAppAtom = get(AppAtom);
    const imageUrl =
      appState.cocoHit?.pages?.[appState.submitCount - 1]?.image?.url;
    const totalSubmitCount = appState.cocoHit?.pages?.length;
    const cocoHitPage = appState.cocoHit?.pages?.[appState.submitCount - 1];
    return {
      ...appState,
      imageUrl,
      totalSubmitCount,
      cocoHitPage,
    };
  },
  set: ({ set }, newState) => {
    if (newState instanceof DefaultValue) {
      set(AppAtom, newState);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imageUrl, totalSubmitCount, cocoHitPage, ...atomValue } =
        newState;
      set(AppAtom, atomValue as IAppAtom);
    }
  },
});

export default AppState;
