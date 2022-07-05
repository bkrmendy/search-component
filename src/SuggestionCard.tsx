import React from "react";
import {
  AvatarContainer,
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

  const hoverColor = "#f2f2f5";
  const bgColor = isSelected ? hoverColor : "transparent";

  return (
    <Clickable onClick={onClickI} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <CardBackground bgColor={bgColor} hoverColor={hoverColor}>
        <FlexRow alignItems="center">
          <HorizontalSpacer w={10} />
          <AvatarContainer>
            <AvatarImg src={props.avatar} alt="" />
          </AvatarContainer>
          <HorizontalSpacer w={10} />
          <FlexColumn>
            <Label>{props.name}</Label>
            <VerticalSpacer h={4} />
            <Detail>{props.email}</Detail>
          </FlexColumn>
          <HorizontalSpacer w={10} />
        </FlexRow>
      </CardBackground>
    </Clickable>
  );
};
