import { Transforms } from "slate";
import { RenderElementProps } from "slate-react";
import { MentionComponent } from "../Components";
import { CustomEditor, CustomElement } from "../slate-custom";
import { UserInfo } from "../UserInfo";

export const withMentions = (editor: CustomEditor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element: CustomElement) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element: CustomElement) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  return editor;
};

export const insertMention = (editor: CustomEditor, user: UserInfo) => {
  Transforms.insertNodes(editor, [
    {
      type: "mention",
      userId: user.id,
      content: user.name,
      children: [{ text: "" }],
    },
    { text: " " },
  ]);
  Transforms.move(editor);
};

export const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "mention":
      return <Mention {...props} content={element.content} />;
    default:
      return <span {...attributes}>{children}</span>;
  }
};

type MentionProps = RenderElementProps & {
  content: string;
};

const Mention = ({ attributes, content }: MentionProps) => {
  return (
    <MentionComponent {...attributes} contentEditable={false} spellCheck="false">
      {content}
    </MentionComponent>
  );
};