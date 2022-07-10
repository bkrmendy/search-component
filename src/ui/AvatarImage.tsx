import React from "react";
import { AvatarContainer, AvatarImg } from "./Components";

export interface AvatarImageProps {
  src: string;
}

export const AvatarImage = (props: AvatarImageProps) => {
  const [loaded, setLoaded] = React.useState(false);

  const onLoad = React.useCallback(() => setLoaded(true), []);

  return (
    <AvatarContainer>
      <AvatarImg src={props.src} loaded={loaded} onLoad={onLoad} />
    </AvatarContainer>
  );
};
