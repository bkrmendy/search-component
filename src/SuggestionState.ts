import { UserInfo } from "./UserInfo";

export type SuggestionState =
    | { type: "inactive" }
    | { type: "active", suggestions: UserInfo[] }
