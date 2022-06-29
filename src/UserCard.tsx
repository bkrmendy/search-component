import React from "react";
import { AvatarImg, Button, CardBackground, CloseIcon, FlexColumn, FlexRow, HorizontalSpacer, Label, VerticalSpacer } from "./Components";
import { Handler } from "./Utils";

interface UserCardProps {
  name: string;
  avatar: string;
  email: string;
  onRemove: Handler;
  onClick: Handler;
}

export const UserCard = (props: UserCardProps) => {
  return (
    <CardBackground borderColor="transparent" bgColor="transparent" hoverColor="rgb(241, 242, 246)">
      <FlexRow onClick={props.onClick}>
        <AvatarImg src={props.avatar} />
        <HorizontalSpacer w={4} />
        <FlexColumn>
          <Label>{props.name}</Label>
          <VerticalSpacer h={4} />
          <Label>{props.email}</Label>
        </FlexColumn>
        <Button onClick={props.onRemove} width={20}>
          <CloseIcon fillColor="rgb(231, 232, 236)" />
        </Button>
      </FlexRow>
    </CardBackground>
  );
};
