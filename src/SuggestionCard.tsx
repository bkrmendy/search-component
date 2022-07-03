import React from "react";
import {
  AvatarImg,
  CardBackground,
  Clickable,
  Detail,
  FlexColumn,
  FlexRow,
  HorizontalSpacer,
  Label,
  VerticalSpacer,
} from "./Components";
import { Handler } from "./Utils";

interface SuggestionCardProps {
  name: string;
  avatar: string;
  email: string;
  isSelected: boolean;
  onMouseEnter: Handler;
  onMouseLeave: Handler;
  onClick: Handler;
}

export const SuggestionCard = (props: SuggestionCardProps) => {
  const { onClick, onMouseEnter, onMouseLeave, isSelected } = props;

  const onClickI = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  const hoverColor = "rgb(241, 242, 246)";
  const bgColor = isSelected ? hoverColor : "transparent";

  return (
    <Clickable onClick={onClickI} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <CardBackground borderColor="transparent" bgColor={bgColor} hoverColor={hoverColor}>
        <FlexRow alignItems="center">
          <HorizontalSpacer w={10} />
          <AvatarImg src={props.avatar} />
          <HorizontalSpacer w={10} />
          <FlexColumn>
            <Label>{props.name}</Label>
            <VerticalSpacer h={4} />
            <Detail>{props.email}</Detail>
          </FlexColumn>
        </FlexRow>
      </CardBackground>
    </Clickable>
  );
};
