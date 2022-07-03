import { BaseEditor, BaseElement, Text } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

interface MentionElement extends BaseElement {
  type: "mention";
  content: string;
  userId: string;
  children: Text[];
}

interface ParapgraphElement extends BaseElement {
  type: "paragraph";
}

export type CustomElement = ParapgraphElement | MentionElement
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  export interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
  }
}