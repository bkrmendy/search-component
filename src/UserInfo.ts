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
  { id: "5", avatar: "https://ui-avatars.com/api/?name=Adam+Smith", email: "adam@independence.co", name: "Adam Smith" },
  { id: "6", avatar: "https://ui-avatars.com/api/?name=Rick+Pastoor", email: "rick@risecalendar.com", name: "Rick Pastoor" },
  { id: "7", avatar: "https://ui-avatars.com/api/?name=Stewart+Butterfield", email: "stewart@slack.co", name: "Stewart Butterfield" },
  { id: "8", avatar: "https://ui-avatars.com/api/?name=Willem+Spruijt", email: "willem@risecalendar.com", name: "Willem Spruijt" },
  { id: "9", avatar: "https://ui-avatars.com/api/?name=Serena+Nielson", email: "serena@company.co", name: "Serena Nielson" },
  { id: "10", avatar: "https://ui-avatars.com/api/?name=Marianne+Pannell", email: "marianne@company.co", name: "Marianne Pannell" },
  { id: "11", avatar: "https://ui-avatars.com/api/?name=Emiel+Jansen", email: "emiel@risecalendar.com", name: "Emiel Jansen" },
  { id: "12", avatar: "https://ui-avatars.com/api/?name=Berci+Kormendy", email: "bertalan@kormendy.hu", name: "Berci Kormendy" },
];

export const isUserAvailable = ({ id }: UserInfo) => (parseInt(id, 10) % 2) > 0;