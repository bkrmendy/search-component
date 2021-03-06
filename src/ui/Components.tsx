import styled from "styled-components";

export const FlexRow = styled.div<{ justifyContent?: string; alignItems?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justifyContent ?? "start"};
  align-items: ${props => props.alignItems ?? "start"};
  width: 100%;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  user-select: none;
`;

export const LabelValue = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  user-select: none;
`;

export const PlaceholderLabel = styled(LabelValue)`
  color: rgba(0, 0, 0, 0.25);
`;

export const Detail = styled.span`
  user-select: none;
  font-size: 11px;
  color: rgba(132, 135, 147, 0.75);
  line-height: 13px;
  font-weight: 500;
  user-select: none;
`;

export const CalendarLabel = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: rgb(132, 135, 147);
  user-select: none;
`;

export const Title = styled.div`
  user-select: none;
  font-size: 15px;
  font-weight: 600;
  font-family: sans-serif;
  user-select: none;
`;

interface CardBackgroundColors {
  bgColor: string;
  hoverColor: string;
}

export const CardBackground = styled.div<CardBackgroundColors>`
  box-sizing: border-box;
  border-radius: 8px;

  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 4px;
  padding-right: 4px;

  min-width: 200px;

  background-color: ${props => props.bgColor};

  transition: background-color 0.1s;

  &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

export const AvatarContainer = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background: linear-gradient(153deg, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%);
`;

export const AvatarImg = styled.img<{ loaded: boolean }>`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  object-fit: cover;
  opacity: ${props => (props.loaded ? 1 : 0)};
`;

export const Clickable = styled.div`
  cursor: pointer;
`;

export const Width = styled.div<{ w: string }>`
  width: ${props => props.w};
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

  user-select: none;

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
  min-height: 30px;
`;

export const RightSidebar = styled.div<{ bgColor: string }>`
  position: absolute;
  height: 100%;
  right: 0px;
  width: 400px;
  background-color: ${props => props.bgColor};
`;

export const MentionComponent = styled.span<{ selected: boolean }>`
  box-sizing: border-box;
  margin: 2px 2px;
  vertical-align: baseline;
  display: inline-block;
  border-radius: 4px;
  background-color: ${props => (props.selected ? "rgb(169, 159, 242)" : "rgb(113, 97, 236)")};
  color: white;
  line-height: 22px;
  padding: 2px 4px;
  font-weight: 400;
  white-space: nowrap;
  user-select: none;
`;
