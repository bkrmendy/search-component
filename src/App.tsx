import React from 'react';
import { FlexRow } from "./Components";
import { InputField } from "./InputField";
import { tokenizeInput, userInfoMatchesSearchTerm } from "./SearchUtils";
import { SuggestionCard } from "./SuggestionCard";
import { SuggestionState } from "./SuggestionState";
import { UserCard } from "./UserCard";
import { UserInfo, USERS } from "./UserInfo";
import { noop } from "./Utils";

function App() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [invitedUsers, setInvitedUsers] = React.useState<UserInfo[]>([]);
  const [suggestionState, setSuggestionState] = React.useState<SuggestionState>({ type: "inactive" });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const removeInvitedUser = (userId: string) => setInvitedUsers(invitedUsers.filter(user => user.id !== userId));

  const addInvitedUser = (userInfo: UserInfo) => setInvitedUsers([...invitedUsers, userInfo]);

  React.useEffect(() => {
    if (suggestionState.type === "inactive") {
      return;
    }

    const lastSearchTerm = tokenizeInput(inputValue).pop();
    if (lastSearchTerm == null) {
      return;
    }

    setTimeout(() => {
      setSuggestionState({
        type: "active",
        suggestions: USERS.filter(user => userInfoMatchesSearchTerm(lastSearchTerm, user.name)),
      });
    }, 0);
  }, [inputValue, suggestionState, setSuggestionState]);

  const dismissSuggestions = React.useCallback(() => {
    setSuggestionState({ type: "inactive" });
  }, [setSuggestionState]);

  const escListener = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Escape") {
        return;
      }
      e.preventDefault();
      dismissSuggestions();
    },
    [dismissSuggestions]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  });

  const activateSuggestions = React.useCallback(() => {
    console.log("activate");
    setTimeout(() => setSuggestionState({ type: "active", suggestions: [] }), 0);
  }, [setSuggestionState]);

  return (
    <FlexRow>
      <InputField
        forwardRef={inputRef}
        value={inputValue}
        onChange={setInputValue}
        onBlur={dismissSuggestions}
        onFocus={activateSuggestions}
      />
      <div>
        <h2>Suggestions</h2>
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
      </div>
      <div>
        <h2>Invitees</h2>
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
    </FlexRow>
  );
}

export default App;
