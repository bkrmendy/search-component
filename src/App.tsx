import React from "react";
import {
  CalendarLabel,
  FlexColumn,
  FlexRow,
  HorizontalSpacer,
  Padding,
  RightSidebar,
  VerticalSpacer,
} from "./Components";
import { InputField } from "./InputField";
import { UserCard } from "./UserCard";
import { UserInfo } from "./UserInfo";
import { noop, Observer, ReifiedFunction } from "./Utils";

import autoAnimate from "@formkit/auto-animate";

function addInvitedUserI(users: UserInfo[], user: UserInfo): UserInfo[] {
  if (users.some(u => u.id === user.id)) {
    return users;
  }
  return [...users, user];
}

type Remover = (_: string[]) => void;

function App() {
  const [invitedUsers, setInvitedUsers] = React.useState<UserInfo[]>([]);
  const listenerRef = React.useRef<ReifiedFunction<Remover>>({ fn: noop });

  const autoAnimateRef = React.useRef(null);

  const removeInvitedUser = React.useCallback(
    (userIds: string[]) => {
      setInvitedUsers(invitedUsers.filter(user => !userIds.includes(user.id)));
    },
    [invitedUsers]
  );

  const removeObserver: Observer<string[]> = React.useMemo(
    () => ({ observe: fn => (listenerRef.current.fn = fn) }),
    []
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
              addInvitedUser={addInvitedUser}
              onInvitedUserRemoved={removeInvitedUser}
              removeInvitedUser={removeObserver}
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
                    available={Math.random() > 0.5}
                    onRemove={() => {
                      removeInvitedUser([user.id]);
                      listenerRef.current.fn([user.id]);
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
