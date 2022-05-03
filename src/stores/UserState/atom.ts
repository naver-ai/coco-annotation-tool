// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { atom } from "recoil";
import DefaultUser from "./default";
import { UserAtomType } from "./type";

const UserAtom = atom<UserAtomType>({
  key: "userAtom",
  default: DefaultUser,
});

export default UserAtom;
