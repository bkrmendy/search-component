import { Descendant, Element } from "slate";

function gatherMentions(state: Descendant[]): Set<string> {
    const ids = new Set<string>();

    const walk = (ds: Descendant[]) => {
        ds.forEach((node: Descendant) => {
            if (Element.isElement(node)) {
                if (node.type === "mention") {
                    ids.add(node.userId);
                } else {
                    walk(node.children);
                }
            }
        });
    };

    walk(state);
    return ids;
}

export interface Diff {
    removed: string[];
}

export function diffStates(before: Descendant[], after: Descendant[]): Diff {
    const idsBefore = gatherMentions(before);
    const idsAfter = gatherMentions(after);

    const removed: string[] = [];
    for (const id of idsBefore) {
        if (!idsAfter.has(id)) {
            removed.push(id);
        }
    }

    return {
        removed
    };
}

export function filterNodes(descendants: Descendant[], fn: (d: Descendant) => boolean): Descendant[] {
    return descendants.reduce((acc: Descendant[], val: Descendant) => {
        const shouldRecurse = fn(val);
        if (shouldRecurse) {
            const next = Element.isElement(val) ? { ...val, children: filterNodes(val.children, fn) } : val;
            return [...acc, next];
        }
        return acc;
    }, []);
}
