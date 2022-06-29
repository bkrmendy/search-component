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
      <FlexRow onClick={props.onClick} justifyContent="space-between" alignItems="center">
        <FlexRow justifyContent="start" alignItems="center">
          <AvatarImg src={props.avatar} />
          <HorizontalSpacer w={8} />
          <FlexColumn>
            <Label>{props.name}</Label>
            <VerticalSpacer h={4} />
            <Label>{props.email}</Label>
          </FlexColumn>
          <HorizontalSpacer w={8} />
        </FlexRow>
        <Button onClick={props.onRemove} width={20} xxColor={"rgb(231, 232, 236)"} hoverColor={"rgb(221, 212, 226)"}>
          <CloseIcon />
        </Button>
      </FlexRow>
    </CardBackground>
  );
};
