import { BaseElement, Descendant, Element } from "slate";
import { filterNodes } from "./Utils";

describe("slate utils", () => {
    it("is correct", () => {
        const state: Descendant[] = [
            {
                "text": ""
            },
            {
                "type": "mention",
                "userId": "1",
                "content": "John Smith",
                "children": [
                    {
                        "text": ""
                    }
                ]
            },
            {
                "text": " "
            }
        ];

        const next = filterNodes(state, node => {
            const isMention = Element.isElement(node) && node.type === "mention";
            if (!isMention) {
                return true;
            }
            return !["1"].includes(node.userId);
        });

        expect(next.length).toEqual(2);
    });

    it("recurse", () => {
        const state: Descendant[] = [{
            type: "paragraph",
            children: [
                {
                    "text": ""
                },
                {
                    "type": "mention",
                    "userId": "1",
                    "content": "John Smith",
                    "children": [
                        {
                            "text": ""
                        }
                    ]
                },
                {
                    "text": " "
                }
            ]
        }]

        const next = filterNodes(state, node => {
            const isMention = Element.isElement(node) && node.type === "mention";
            if (!isMention) {
                return true;
            }
            return !["1"].includes(node.userId);
        });

        expect(next.length).toEqual(1);
        expect((next[0] as BaseElement).children.length).toEqual(2);
    });
})