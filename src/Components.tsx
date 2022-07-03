import styled from "styled-components";

export const FlexRow = styled.div<{ justifyContent?: string; alignItems?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent ?? "start"};
  align-items: ${props => props.alignItems ?? "start"};
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VerticalSpacer = styled.div<{ h: number }>`
  min-height: ${props => props.h}px;
  max-height: ${props => props.h}px;
`;

export const HorizontalSpacer = styled.div<{ w: number }>`
  min-width: ${props => props.w}px;
  max-width: ${props => props.w}px;
`;

export const Label = styled.span`
  user-select: none;
  font-size: 13px;
  font-weight: 500;
`;

export const Detail = styled.span`
  user-select: none;
  font-size: 11px;
  color: rgba(132, 135, 147, 0.75);
  line-height: 13px;
  font-weight: 500;
`;

export const CalendarLabel = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: rgb(132, 135, 147);
`;

export const Title = styled.div`
  user-select: none;
  font-size: 15px;
  font-weight: 600;
  font-family: sans-serif;
`;

interface CardBackgroundColors {
  borderColor: string;
  bgColor: string;
  hoverColor: string;
}

export const CardBackground = styled.div<CardBackgroundColors>`
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${props => props.borderColor};

  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 4px;
  padding-right: 4px;

  background-color: ${props => props.bgColor};

  transition: background-color 0.1s;

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

export const AvatarImg = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

export const Clickable = styled.div`
  cursor: pointer;
`;

export const Padding = styled.div<{ p: number }>`
  padding: ${props => props.p}px;
`;

export const Box = styled.div<{ size: number }>`
  max-width: ${props => props.size}px;
  min-width: ${props => props.size}px;
  max-height: ${props => props.size}px;
  min-height: ${props => props.size}px;
`;

export const Button = styled(Clickable)<{ width: number; xxColor: string; hoverColor: string }>`
  width: ${props => props.width}px;
  color: ${props => props.xxColor};

  transition: background-color 0.1s;

  &:hover {
    color: ${props => props.hoverColor};
  }
`;

export const InputFieldComp = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

export const RightSidebar = styled.div<{ bgColor: string }>`
  position: absolute;
  height: 100%;
  right: 0px;
  width: 400px;
  background-color: ${props => props.bgColor};
`;
