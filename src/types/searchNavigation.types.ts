export type HomeStackParamList = {
  Home: undefined;
  FindEvents: { searchQuery: string };
  EventDetail: { eventId: string };
  NearbyEvents: undefined;
  CurrentMonthEvents: undefined;
}; 