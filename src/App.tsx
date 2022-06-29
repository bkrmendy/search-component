import React from 'react';
import { FlexColumn, FlexRow } from "./Components";
import { InputField } from "./InputField";
import { tokenizeInput, userInfoMatchesSearchTerm } from "./SearchUtils";
import { SuggestionCard } from "./SuggestionCard";
import { SuggestionState } from "./SuggestionState";
import { UserCard } from "./UserCard";
import { UserInfo, USERS } from "./UserInfo";
import { noop } from "./Utils";

import autoAnimate from "@formkit/auto-animate";

function addInvitedUserI(users: UserInfo[], user: UserInfo): UserInfo[] {
  if (users.some(u => u.id === user.id)) {
    return users;
  }
  return [...users, user];
}

function App() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [invitedUsers, setInvitedUsers] = React.useState<UserInfo[]>([]);
  const [suggestionState, setSuggestionState] = React.useState<SuggestionState>({ type: "active", suggestions: [] });

  const autoAnimateRef = React.useRef(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const removeInvitedUser = (userId: string) => setInvitedUsers(invitedUsers.filter(user => user.id !== userId));

  const addInvitedUser = (userInfo: UserInfo) => setInvitedUsers(addInvitedUserI(invitedUsers, userInfo));

  const onSearchTermChanged = React.useCallback(
    (searchTerm: string) => {
      console.log(searchTerm);
      setInputValue(searchTerm);

      if (suggestionState.type === "inactive") {
        return;
      }

      if (searchTerm.length === 0) {
        setSuggestionState({ type: "inactive" });
      }

      const lastSearchTerm = tokenizeInput(searchTerm).pop();

      if (lastSearchTerm == null) {
        setSuggestionState({ type: "active", suggestions: [] });
        return;
      }

      setSuggestionState({
        type: "active",
        suggestions: USERS.filter(user => userInfoMatchesSearchTerm(lastSearchTerm, user.name)),
      });
    },
    [suggestionState.type]
  );

  React.useEffect(() => {
    autoAnimateRef.current && autoAnimate(autoAnimateRef.current, { duration: 100 });
  }, [autoAnimateRef]);

  const dismissSuggestions = React.useCallback(() => {
    setSuggestionState({ type: "inactive" });
  }, [setSuggestionState]);

  const escListener = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Escape") {
        return;
      }

      if (suggestionState.type === "inactive") {
        inputRef.current?.blur();
      }

      e.preventDefault();
      dismissSuggestions();
    },
    [dismissSuggestions, suggestionState.type]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  });

  const activateSuggestions = React.useCallback(() => {
    console.log("activate");
    if (suggestionState.type === "inactive") {
      setSuggestionState({ type: "active", suggestions: [] });
    }
  }, [setSuggestionState, suggestionState.type]);

  return (
    <FlexRow>
      <FlexColumn>
        <InputField
          forwardRef={inputRef}
          value={inputValue}
          onChange={onSearchTermChanged}
          onBlur={noop}
          onFocus={activateSuggestions}
        />
        <div ref={autoAnimateRef}>
          {invitedUsers.map(user => (
            <UserCard
              key={user.id}
              name={user.name}
              avatar={user.avatar}
              email={user.email}
              onRemove={() => removeInvitedUser(user.id)}
              onClick={noop}
            />
          ))}
        </div>
      </FlexColumn>
      <FlexColumn>
        {suggestionState.type === "active"
          ? suggestionState.suggestions.map(user => (
              <SuggestionCard
                key={user.id}
                name={user.name}
                email={user.email}
                avatar={user.avatar}
                onClick={() => addInvitedUser(user)}
              />
            ))
          : null}
      </FlexColumn>
    </FlexRow>
  );
}

export default App;
