export type Trips = {
  id: number;
  tripTitle: string;
  posts: Posts;
  startDate: string;
  endDate: string;
};

export type Posts = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  content: string;
  tripId: number;
}[];
