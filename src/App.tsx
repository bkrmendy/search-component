import React from "react";
import {
  CalendarLabel,
  FlexColumn,
  FlexRow,
  HorizontalSpacer,
  Padding,
  RightSidebar,
  VerticalSpacer,
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
            <FlexRow>
              <CalendarLabel>Attendees</CalendarLabel>
              <HorizontalSpacer w={50} />
              <div ref={autoAnimateRef}>
                {invitedUsers.map(user => (
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
                ))}
              </div>
            </FlexRow>
          </FlexColumn>
        </FlexRow>
      </Padding>
    </RightSidebar>
  );
}

export default App;
