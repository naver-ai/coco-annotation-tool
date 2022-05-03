// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import IconData from "./json/icons.json";
import IconCategoryData from "./json/icon-categories.json";
import ImageList from "./json/image-list.json";

export type IconType = keyof typeof IconData;
export const IconNames = Object.getOwnPropertyNames(IconData) as IconType[];
export const IconRecord = IconData as Record<IconType, string>;

export type IconCategoryType = keyof typeof IconCategoryData;
export const IconCategoryNames = Object.getOwnPropertyNames(
  IconCategoryData
) as IconCategoryType[];
export const IconCategoryRecord = IconCategoryData as Record<
  IconCategoryType,
  IconType[]
>;

export const MAGNIFIER_SCALE = 1.5;
export const MAGNIFIER_RADIUS = 80;
export const DRAG_ICON_SIZE = 40;
export const DRAG_ICON_OPACITY = 0.4;
export const ICON_SIZE = 70;
export const GAP_WITH_EACH_ICON = 12;
export const IMAGE_BOARD_HEIGHT = 450;

export const IMAGE_PATH =
  "https://hybridsupervision-coco.s3.us-east-2.amazonaws.com/train2014/";
export const ImageURLs = ImageList.map(
  (file_name) => `${IMAGE_PATH}${file_name}`
);

export type AnnotationVersion = "baseline" | "improved";
