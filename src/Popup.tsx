import React from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { Handler } from "./Utils";

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
    placement: "bottom-end",
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
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        {props.children}
      </div>
    </PopupOverlay>
  );
};
