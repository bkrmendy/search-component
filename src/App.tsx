import React from "react";
import {
  CalendarLabel,
  FlexColumn,
  FlexRow,
  HorizontalSpacer,
  LabelValue,
  Padding,
  PlaceholderLabel,
  RightSidebar,
  VerticalSpacer,
  Width,
} from "./ui/Components";
import { InputField } from "./ui/InputField";
import { UserCard } from "./ui/UserCard";
import { isUserAvailable, UserInfo } from "./data/UserInfo";
import { noop, Observer } from "./utils/Utils";

import autoAnimate from "@formkit/auto-animate";

function addInvitedUserI(users: UserInfo[], user: UserInfo): UserInfo[] {
  if (users.some(u => u.id === user.id)) {
    return users;
  }
  return [...users, user];
}

function App() {
  const [invitedUsers, setInvitedUsers] = React.useState<UserInfo[]>([]);
  const removeObserver = React.useMemo<Observer<string[]>>(() => new Observer(), []);

  const autoAnimateRef = React.useRef(null);

  const removeInvitedUser = React.useCallback(
    (userIds: string[]) => {
      setInvitedUsers(invitedUsers.filter(user => !userIds.includes(user.id)));
    },
    [invitedUsers]
  );

  const addInvitedUser = React.useCallback(
    (userInfo: UserInfo) => setInvitedUsers(addInvitedUserI(invitedUsers, userInfo)),
    [invitedUsers]
  );

  React.useEffect(() => {
    autoAnimateRef.current && autoAnimate(autoAnimateRef.current, { duration: 100 });
  }, [autoAnimateRef]);

  return (
    <RightSidebar bgColor={"white"}>
      <Padding p={20}>
        <FlexRow>
          <FlexColumn>
            <InputField
              invitedUsers={invitedUsers}
              removeInvitedUser={removeObserver}
              addInvitedUser={addInvitedUser}
              onInvitedUserRemoved={removeInvitedUser}
            />
            <VerticalSpacer h={16} />
            <FlexColumn>
              <FlexRow>
                <Width w={"25%"}>
                  <CalendarLabel>Attendees</CalendarLabel>
                </Width>
                <div ref={autoAnimateRef}>
                  {invitedUsers.length === 0 ? (
                    <PlaceholderLabel>Add guests by typing in the title bar</PlaceholderLabel>
                  ) : (
                    invitedUsers.map(user => (
                      <UserCard
                        key={user.id}
                        name={user.name}
                        avatar={user.avatar}
                        available={isUserAvailable(user)}
                        onRemove={() => {
                          removeInvitedUser([user.id]);
                          removeObserver.broadcast([user.id]);
                        }}
                        onClick={noop}
                      />
                    ))
                  )}
                </div>
              </FlexRow>
              <VerticalSpacer h={20} />
              <FlexRow alignItems="baseline">
                <Width w={"25%"}>
                  <CalendarLabel>Duration</CalendarLabel>
                </Width>
                <LabelValue>30 min</LabelValue>
              </FlexRow>
              <VerticalSpacer h={20} />
              <FlexRow alignItems="baseline">
                <Width w={"25%"}>
                  <CalendarLabel>When</CalendarLabel>
                </Width>
                <LabelValue>Tue, Jun 28</LabelValue>
              </FlexRow>
              <VerticalSpacer h={20} />
              <FlexRow alignItems="baseline">
                <Width w={"25%"}>
                  <CalendarLabel>Availability</CalendarLabel>
                </Width>
                <LabelValue>Available</LabelValue>
              </FlexRow>
            </FlexColumn>
          </FlexColumn>
        </FlexRow>
      </Padding>
    </RightSidebar>
  );
}

export default App;
