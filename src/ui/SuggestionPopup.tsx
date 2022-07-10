import React from "react";
import { Popup } from "./Popup";
import { SuggestionCard } from "./SuggestionCard";
import { UserInfo } from "../data/UserInfo";
import { Handler } from "../utils/Utils";

export interface SuggestionPopupProps {
  suggestions: UserInfo[];
  selectedIndex: number | null;
  anchorRef: React.RefObject<HTMLElement>;

  dismissSuggestions: Handler;
  addInvitedUser: (_: UserInfo) => void;
  setSelectedIndex: (_: number | null) => void;
}

export const SuggestionPopup = ({
  suggestions,
  selectedIndex,
  anchorRef,
  dismissSuggestions,
  addInvitedUser,
  setSelectedIndex,
}: SuggestionPopupProps) => {
  return (
    <Popup isShown={suggestions.length > 0} anchorRef={anchorRef} onClickOutside={dismissSuggestions}>
      {suggestions.map((user, idx) => (
        <SuggestionCard
          key={user.id}
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          isSelected={selectedIndex === idx}
          onMouseEnter={() => setSelectedIndex(idx)}
          onMouseLeave={() => setSelectedIndex(null)}
          onClick={() => addInvitedUser(user)}
        />
      ))}
    </Popup>
  );
};
