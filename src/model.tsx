export type Trip = {
  id: number;
  tripTitle: string;
  posts: Post;
  startDate: string;
  endDate: string;
};

export type Post = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  content: string;
  tripId: number;
}[];
