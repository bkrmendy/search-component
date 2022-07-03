import React, { KeyboardEventHandler } from "react";
import { createEditor, Descendant, Range, Editor } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import { InputFieldComp } from "./Components";
import { diffStates } from "./mentions/Utils";
import { withMentions, Element, insertMention } from "./mentions/withMentions";
import { userInfoMatchesSearchTerm } from "./SearchUtils";
import { SuggestionPopup } from "./SuggestionPopup";
import { SuggestionState } from "./SuggestionState";
import { UserInfo, USERS } from "./UserInfo";
import { positiveMod } from "./Utils";

interface InputFieldProps {
  addInvitedUser: (_: UserInfo) => void;
  removeInvitedUser: (userId: string) => void;
  onInvitedUserRemoved: (userId: string) => void;
}

export const InputField = ({ addInvitedUser, onInvitedUserRemoved }: InputFieldProps) => {
  const [editorState, setEditorState] = React.useState<Descendant[]>(initialValue);
  const [suggestionState, setSuggestionState] = React.useState<SuggestionState>({ type: "active", suggestions: [] });
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const renderElement = React.useCallback((props: RenderElementProps) => <Element {...props} />, []);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const editor = React.useMemo(() => withHistory(withReact(withMentions(createEditor()))), []);

  const addInvitedUserI = React.useCallback(
    (userInfo: UserInfo) => {
      addInvitedUser(userInfo);
      Editor.deleteBackward(editor, { unit: "word" });
      insertMention(editor, userInfo);
    },
    [addInvitedUser, editor]
  );

  const onKeyDown = React.useCallback<KeyboardEventHandler<HTMLDivElement>>(
    e => {
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
        setSuggestionState({ type: "active", suggestions: [] });
      }

      if (e.code === "Enter") {
        e.preventDefault();
        if (selectedIndex == null) {
          return;
        }

        const user = suggestionState.suggestions[selectedIndex];
        if (user != null) {
          addInvitedUserI(user);
        }

        // dismissSuggestions();
      }
    },

    [addInvitedUserI, selectedIndex, suggestionState]
  );

  const onChange = React.useCallback(
    (nextState: Descendant[]) => {
      const { selection } = editor;

      if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection);
        const wordBefore = Editor.before(editor, start, { unit: "word" });
        const beforeRange = wordBefore && Editor.range(editor, wordBefore, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        if (beforeText != null) {
          const suggestions = USERS.filter(user => userInfoMatchesSearchTerm(beforeText, user.name));
          setSuggestionState({ type: "active", suggestions });
        }
      }

      const { removed } = diffStates(editorState, nextState);
      console.log(removed);
      removed.forEach(id => onInvitedUserRemoved(id));

      setEditorState(nextState);
    },
    [editor, editorState, onInvitedUserRemoved]
  );

  const dismissSuggestions = React.useCallback(
    () => setSuggestionState({ type: "active", suggestions: [] }),
    [setSuggestionState]
  );

  return (
    <>
      <InputFieldComp ref={inputRef}>
        <Slate editor={editor} value={editorState} onChange={onChange}>
          <Editable placeholder="Add meeting invitees" onKeyDown={onKeyDown} renderElement={renderElement} />
        </Slate>
      </InputFieldComp>
      <SuggestionPopup
        anchorRef={inputRef}
        suggestions={suggestionState.type === "active" ? suggestionState.suggestions : []}
        selectedIndex={selectedIndex}
        dismissSuggestions={dismissSuggestions}
        setSelectedIndex={setSelectedIndex}
        addInvitedUser={addInvitedUserI}
      />
    </>
  );
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
