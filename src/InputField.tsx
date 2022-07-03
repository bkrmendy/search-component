import React, { KeyboardEventHandler } from "react";
import { createEditor, Descendant, Range, Editor, Element as SlateElement } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from "slate-react";
import { InputFieldComp } from "./Components";
import { diffStates, filterNodes } from "./mentions/Utils";
import { withMentions, Element, insertMention } from "./mentions/withMentions";
import { userInfoMatchesSearchTerm } from "./SearchUtils";
import { SuggestionPopup } from "./SuggestionPopup";
import { UserInfo, USERS } from "./UserInfo";
import { Observer, positiveMod } from "./Utils";

interface InputFieldProps {
  addInvitedUser: (_: UserInfo) => void;
  removeInvitedUser: Observer<string[]>;
  onInvitedUserRemoved: (userIds: string[]) => void;
}

export const InputField = ({ addInvitedUser, onInvitedUserRemoved, removeInvitedUser }: InputFieldProps) => {
  const [editorState, setEditorState] = React.useState<Descendant[]>(initialValue);
  const [suggestions, setSuggestions] = React.useState<UserInfo[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const editor = React.useMemo(() => withHistory(withReact(withMentions(createEditor()))), []);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    removeInvitedUser.observe(ids => {
      const filtered = filterNodes(editorState, node => {
        const isMention = SlateElement.isElement(node) && node.type === "mention";
        if (!isMention) {
          return true;
        }
        return !ids.includes(node.userId);
      });
      ReactEditor.deselect(editor);
      ReactEditor.blur(editor);
      window.getSelection()?.empty();
      setEditorState(filtered);
      editor.children = filtered;
    });
  }, [editor, editorState, removeInvitedUser, setEditorState]);

  const renderElement = React.useCallback((props: RenderElementProps) => <Element {...props} />, []);

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
      if (suggestions.length === 0) {
        return;
      }

      if (e.code === "ArrowDown") {
        e.preventDefault();
        if (selectedIndex == null) {
          setSelectedIndex(0);
        } else {
          setSelectedIndex(positiveMod(selectedIndex + 1, suggestions.length));
        }
      }

      if (e.code === "ArrowUp") {
        e.preventDefault();
        if (selectedIndex == null) {
          setSelectedIndex(suggestions.length - 1);
        } else {
          setSelectedIndex(positiveMod(selectedIndex - 1, suggestions.length));
        }
      }

      if (e.code === "Escape") {
        e.preventDefault();
        setSuggestions([]);
      }

      if (e.code === "Enter") {
        e.preventDefault();
        if (selectedIndex == null) {
          return;
        }

        const user = suggestions[selectedIndex];
        if (user != null) {
          addInvitedUserI(user);
        }

        // dismissSuggestions();
      }
    },

    [addInvitedUserI, selectedIndex, suggestions]
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
          setSuggestions(suggestions);
        }
      }

      setEditorState(nextState);
      const { removed } = diffStates(editorState, nextState);
      if (removed.length > 0) {
        onInvitedUserRemoved(removed);
      }
    },
    [editor, editorState, onInvitedUserRemoved]
  );

  const dismissSuggestions = React.useCallback(() => setSuggestions([]), [setSuggestions]);

  return (
    <>
      <div ref={inputRef}>
        <InputFieldComp>
          <Slate editor={editor} value={editorState} onChange={onChange}>
            <Editable placeholder="Event name" onKeyDown={onKeyDown} renderElement={renderElement} />
          </Slate>
        </InputFieldComp>
      </div>
      <SuggestionPopup
        anchorRef={inputRef}
        suggestions={suggestions}
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
