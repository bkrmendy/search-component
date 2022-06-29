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
  font-weight: 400;
  font-family: sans-serif;
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

export const Button = styled(Clickable)<{ width: number; xxColor: string; hoverColor: string }>`
  width: ${props => props.width}px;
  color: ${props => props.xxColor};

  transition: background-color 0.1s;

  &:hover {
    color: ${props => props.hoverColor};
  }
`;

export const RelativeContainer = styled.div`
  position: relative;
  width: 320px;
  height: 52px;
`;

export const InputFieldPlaceholder = styled.div<{ xxColor: string }>`
  position: absolute;
  user-select: none;
  font-size: 27px;
  font-family: sans-serif;
  font-weight: 600;
  color: ${props => props.xxColor};

  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

export const InputFieldComp = styled.input`
  position: absolute;
  outline: none;
  resize: none;
  border: none;
  background-color: transparent;

  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  font-size: 27px;
  font-family: sans-serif;
  font-weight: 600;
`;

export const CloseIcon = () => {
  return (
    <svg viewBox="0 0 28 28">
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Artboard" fill={"currentColor"} fillRule="nonzero">
          <g id="􀁡">
            <path
              d="M14.00,28 C15.91,28 17.72,27.63 19.41,26.89 C21.10,26.16 22.59,25.15 23.87,23.86 C25.16,22.57 26.17,21.09 26.90,19.40 C27.63,17.71 28,15.91 28,13.99 C28,12.08 27.63,10.27 26.89,8.58 C26.16,6.89 25.15,5.40 23.86,4.11 C22.57,2.82 21.08,1.81 19.39,1.08 C17.70,0.36 15.90,0 13.99,0 C12.08,0 10.28,0.36 8.59,1.08 C6.90,1.81 5.42,2.82 4.12,4.11 C2.83,5.40 1.82,6.89 1.09,8.58 C0.36,10.27 0,12.08 0,13.99 C0,15.91 0.36,17.71 1.10,19.40 C1.83,21.09 2.84,22.57 4.13,23.86 C5.42,25.15 6.90,26.16 8.59,26.89 C10.28,27.63 12.08,28 14.00,28 Z M9.48,19.75 C9.14,19.75 8.86,19.63 8.62,19.38 C8.38,19.14 8.27,18.85 8.27,18.51 C8.27,18.20 8.39,17.92 8.63,17.68 L12.30,14.00 L8.63,10.34 C8.39,10.11 8.27,9.83 8.27,9.49 C8.27,9.16 8.38,8.87 8.62,8.63 C8.86,8.40 9.14,8.28 9.48,8.28 C9.79,8.28 10.08,8.40 10.33,8.64 L14.00,12.32 L17.71,8.63 C17.95,8.39 18.23,8.27 18.56,8.27 C18.89,8.27 19.18,8.38 19.41,8.62 C19.65,8.86 19.77,9.14 19.77,9.48 C19.77,9.81 19.65,10.10 19.41,10.33 L15.72,14.00 L19.39,17.66 C19.63,17.88 19.75,18.17 19.75,18.51 C19.75,18.85 19.63,19.14 19.40,19.38 C19.16,19.63 18.87,19.75 18.53,19.75 C18.17,19.75 17.88,19.63 17.66,19.39 L14.00,15.73 L10.36,19.39 C10.13,19.63 9.83,19.75 9.48,19.75 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
