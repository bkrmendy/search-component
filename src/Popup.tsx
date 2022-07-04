import React from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Handler } from "./Utils";
import { ZStack } from "./ZStack";

const PopupOverlay = styled.div`
  position: absolute;

  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

interface PopupProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  isShown: boolean;
  onClickOutside: Handler;
}

export const Popup = (props: React.PropsWithChildren<PopupProps>) => {
  const popperRef = React.useRef<HTMLInputElement>(null);

  const { styles, attributes } = usePopper(props.anchorRef.current, popperRef.current, {
    strategy: "absolute",
    placement: "bottom-start",
    modifiers: [
      { name: "offset", options: { offset: [0, 6] } },
      { name: "preventOverflow", options: { rootBoundary: "viewport", padding: 10 } },
    ],
  });

  if (!props.isShown) {
    return null;
  }

  return (
    <PopupOverlay onClick={props.onClickOutside}>
      <PopupContainer ref={popperRef} style={styles.popper} {...attributes.popper}>
        {props.children}
      </PopupContainer>
    </PopupOverlay>
  );
};

const PopupContainer = styled.div`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 15px 30px, rgba(0, 0, 0, 0.2) 0px 0px 1px;

  padding: 4px;

  background-color: white;

  z-index: ${ZStack.POPUP};
`;
