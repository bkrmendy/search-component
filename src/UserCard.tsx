import React from "react";
import {
  AvatarImg,
  Box,
  Button,
  CardBackground,
  Detail,
  FlexColumn,
  FlexRow,
  HorizontalSpacer,
  Label,
  VerticalSpacer,
} from "./Components";
import { Checkmark, CloseIcon, XIcon } from "./Symbols";
import { Handler } from "./Utils";

interface UserCardProps {
  name: string;
  avatar: string;
  available: boolean;
  onRemove: Handler;
  onClick: Handler;
}

export const UserCard = (props: UserCardProps) => {
  const availabilityIcon = props.available ? (
    <Checkmark color={"rgb(105, 180, 132)"} />
  ) : (
    <XIcon color={"rgba(132, 135, 147, 0.75)"} />
  );
  const availabilityLabel = props.available ? "Available" : "Unavailable";

  return (
    <CardBackground borderColor="transparent" bgColor="transparent" hoverColor="rgb(241, 242, 246)">
      <FlexRow onClick={props.onClick} justifyContent="space-between" alignItems="center">
        <FlexRow justifyContent="start" alignItems="center">
          <HorizontalSpacer w={10} />
          <AvatarImg src={props.avatar} />
          <HorizontalSpacer w={10} />
          <FlexColumn>
            <Label>{props.name}</Label>
            <VerticalSpacer h={4} />
            <FlexRow alignItems="center">
              <Box size={11}>{availabilityIcon}</Box>
              <HorizontalSpacer w={5} />
              <Detail>{availabilityLabel}</Detail>
            </FlexRow>
          </FlexColumn>
          <HorizontalSpacer w={10} />
        </FlexRow>
        <Button onClick={props.onRemove} width={16} xxColor={"rgb(231, 232, 236)"} hoverColor={"rgb(242, 242, 245)"}>
          <CloseIcon />
        </Button>
        <HorizontalSpacer w={5} />
      </FlexRow>
    </CardBackground>
  );
};
