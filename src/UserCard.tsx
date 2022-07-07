import React from "react";
import { AvatarImage } from "./AvatarImage";
import {
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
    <CardBackground bgColor="transparent" hoverColor="#f2f2f5">
      <FlexRow onClick={props.onClick} justifyContent="space-between" alignItems="center">
        <FlexRow justifyContent="start" alignItems="center">
          <HorizontalSpacer w={10} />
          <AvatarImage src={props.avatar} />
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
        <Button onClick={props.onRemove} width={16} xxColor={"rgb(231, 232, 236)"} hoverColor={"rgb(189, 189, 191)"}>
          <CloseIcon />
        </Button>
        <HorizontalSpacer w={5} />
      </FlexRow>
    </CardBackground>
  );
};
