import React from "react";
import { CalendarLabel, FlexColumn, FlexRow, HorizontalSpacer, Padding, RightSidebar } from "./Components";
import { InputField } from "./InputField";
import { tokenizeInput, userInfoMatchesSearchTerm } from "./SearchUtils";
import { SuggestionState } from "./SuggestionState";
import { UserCard } from "./UserCard";
import { UserInfo, USERS } from "./UserInfo";
import { noop } from "./Utils";

import autoAnimate from "@formkit/auto-animate";
import { SuggestionPopup } from "./SuggestionPopup";

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

  const activateSuggestions = React.useCallback(() => {
    if (suggestionState.type === "inactive") {
      setSuggestionState({ type: "active", suggestions: [] });
    }
  }, [setSuggestionState, suggestionState.type]);

  return (
    <RightSidebar bgColor={"white"}>
      <Padding p={20}>
        <FlexRow>
          <FlexColumn>
            <InputField
              value={inputValue}
              onChange={onSearchTermChanged}
              onBlur={noop}
              onFocus={activateSuggestions}
              forwardRef={inputRef}
            />
            <FlexRow>
              <CalendarLabel>Attendees</CalendarLabel>
              <HorizontalSpacer w={50} />
              <div ref={autoAnimateRef}>
                {invitedUsers.map(user => (
                  <UserCard
                    key={user.id}
                    name={user.name}
                    avatar={user.avatar}
                    available={Math.random() > 0.5}
                    onRemove={() => removeInvitedUser(user.id)}
                    onClick={noop}
                  />
                ))}
              </div>
            </FlexRow>
          </FlexColumn>
          <SuggestionPopup
            anchorRef={inputRef}
            suggestionState={suggestionState}
            dismissSuggestions={dismissSuggestions}
            addInvitedUser={addInvitedUser}
          />
        </FlexRow>
      </Padding>
    </RightSidebar>
  );
}

export default App;
