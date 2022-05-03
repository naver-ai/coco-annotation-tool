// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
export interface CocoHITPage {
  pageno: number;
  image: {
    id: string;
    url: string;
  };
}

export interface CocoHIT {
  hitDatasetName: string;
  isUnique?: boolean;
  id: string;
  pages: CocoHITPage[];
}
