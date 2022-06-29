import React from "react";
import { AvatarImg, CardBackground, Clickable, FlexColumn, FlexRow, HorizontalSpacer, Label, VerticalSpacer } from "./Components";
import { Handler } from "./Utils";

interface SuggestionCardProps {
  name: string;
  avatar: string;
  email: string;
  onClick: Handler;
}

export const SuggestionCard = (props: SuggestionCardProps) => {
  const { onClick } = props;

  const onClickI = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <Clickable onClick={onClickI}>
      <CardBackground borderColor="transparent" bgColor="transparent" hoverColor="rgb(241, 242, 246)">
        <FlexRow alignItems="center">
          <AvatarImg src={props.avatar} />
          <HorizontalSpacer w={4} />
          <FlexColumn>
            <Label>{props.name}</Label>
            <VerticalSpacer h={4} />
            <Label>{props.email}</Label>
          </FlexColumn>
        </FlexRow>
      </CardBackground>
    </Clickable>
  );
};
