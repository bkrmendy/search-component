export interface UserInfo {
  id: string;
  avatar: string;
  email: string;
  name: string;
}

export const USERS: UserInfo[] = [
  { id: "1", avatar: "https://ui-avatars.com/api/?name=John+Smith", email: "john@company.co", name: "John Smith" },
  { id: "2", avatar: "https://ui-avatars.com/api/?name=Joan+Doe", email: "jane@company.co", name: "Jane Doe" },
  { id: "3", avatar: "https://ui-avatars.com/api/?name=Ricardo+Somebody", email: "ric@duck.co", name: "Ricardo Somebody" },
  { id: "4", avatar: "https://ui-avatars.com/api/?name=Bernardo+Somebody", email: "bern@duck.co", name: "Bernardo Somebody" },
  { id: "5", avatar: "https://ui-avatars.com/api/?name=John+Smith", email: "john@independence.co", name: "Adam Smith" },
]