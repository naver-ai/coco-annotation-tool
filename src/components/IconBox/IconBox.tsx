// COCO Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Icon } from "@components";
import { IconCategoryNames } from "@constants";
import { ImageBoardState } from "@stores";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import useHandler from "./IconBox.handler";
import {
  Category,
  CategoryIcons,
  CategoryTitle,
  ChevronButton,
  Container,
  ProgressBar,
} from "./IconBox.style";
import { camelcaseToAmpersand } from "./IconBox.util";
import LeftChevron from "./images/LeftChevron.png";
import RightChevron from "./images/RightChevron.png";

const IconBox = () => {
  const imageBoard = useRecoilValue(ImageBoardState);
  const {
    categoryIndex,
    currentCategoryName,
    currentCategoryIcons,
    hasPrevious,
    prevCategory,
    hasNext,
    nextCategory,
  } = useHandler();
  const totalIndex = IconCategoryNames.length - 1;

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.keyCode === 37) {
        prevCategory(true);
      } else if (e.keyCode === 39) {
        nextCategory(true);
      }
    };
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [prevCategory, nextCategory]);

  return (
    <Container>
      <CategoryTitle>{camelcaseToAmpersand(currentCategoryName)}</CategoryTitle>
      <Category>
        <ChevronButton disabled={!hasPrevious} onClick={() => prevCategory()}>
          <img src={LeftChevron} alt="Previous category" />
        </ChevronButton>
        <CategoryIcons>
          {currentCategoryIcons.map((iconName) => (
            <Icon
              key={iconName}
              iconType={iconName}
              disabled={!!imageBoard.icons[iconName]}
              displayName
            />
          ))}
        </CategoryIcons>
        <ChevronButton disabled={!hasNext} onClick={() => nextCategory()}>
          <img src={RightChevron} alt="Next category" />
        </ChevronButton>
      </Category>
      <ProgressBar progress={(categoryIndex + 1) / (totalIndex + 1)}>
        <div />
        <span>
          {categoryIndex + 1} / {totalIndex + 1}
        </span>
      </ProgressBar>
    </Container>
  );
};

export default IconBox;
