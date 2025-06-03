export type RootStackParamList = {
  Home: undefined;
  Friend: undefined;
  Profile: undefined;
  EventDetail: { eventId: string };
  FindEvents: { searchQuery: string };
  // Add other screen params as needed
};
