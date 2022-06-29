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
  return (
    <Clickable>
      <CardBackground borderColor="transparent" bgColor="transparent" hoverColor="rgb(241, 242, 246)">
        <FlexRow onClick={props.onClick} alignItems="center">
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
