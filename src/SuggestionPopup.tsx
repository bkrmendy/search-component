import React from "react";
import { Popup } from "./Popup";
import { SuggestionCard } from "./SuggestionCard";
import { SuggestionState } from "./SuggestionState";
import { UserInfo } from "./UserInfo";
import { Handler, positiveMod } from "./Utils";

export interface SuggestionPopupProps {
  suggestionState: SuggestionState;
  dismissSuggestions: Handler;
  addInvitedUser: (_: UserInfo) => void;
  anchorRef: React.RefObject<HTMLElement>;
}

export const SuggestionPopup = ({
  suggestionState,
  dismissSuggestions,
  addInvitedUser,
  anchorRef,
}: SuggestionPopupProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const areAnySuggestionsShown = () => suggestionState.type === "active" && suggestionState.suggestions.length > 0;

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (suggestionState.type !== "active" || suggestionState.suggestions.length === 0) {
        return;
      }

      if (e.code === "ArrowDown") {
        e.preventDefault();
        if (selectedIndex == null) {
          setSelectedIndex(0);
        } else {
          setSelectedIndex(positiveMod(selectedIndex + 1, suggestionState.suggestions.length));
        }
      }

      if (e.code === "ArrowUp") {
        e.preventDefault();
        if (selectedIndex == null) {
          setSelectedIndex(suggestionState.suggestions.length - 1);
        } else {
          setSelectedIndex(positiveMod(selectedIndex - 1, suggestionState.suggestions.length));
        }
      }

      if (e.code === "Escape") {
        e.preventDefault();
        dismissSuggestions();
      }

      if (e.code === "Enter") {
        e.preventDefault();
        if (selectedIndex == null) {
          return;
        }

        const user = suggestionState.suggestions[selectedIndex];
        if (user != null) {
          addInvitedUser(user);
        }

        dismissSuggestions();
      }
    },

    [addInvitedUser, dismissSuggestions, selectedIndex, suggestionState]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <Popup isShown={areAnySuggestionsShown()} anchorRef={anchorRef} onClickOutside={dismissSuggestions}>
      {suggestionState.type === "active"
        ? suggestionState.suggestions.map((user, idx) => (
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
          ))
        : null}
    </Popup>
  );
};
