import { BaseEditor, BaseElement } from "slate";
import { ReactEditor } from "slate-react";

interface MentionElement extends BaseElement {
  type: "mention";
  content: string;
  userId: string;
}

interface ParapgraphElement extends BaseElement {
  type: "paragraph";
}

export type CustomElement = ParapgraphElement | MentionElement
export type CustomEditor = BaseEditor & ReactEditor;

declare module "slate" {
  export interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
  }
}