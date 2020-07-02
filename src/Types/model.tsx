export type Trip = {
  id: number;
  tripTitle: string;
  posts: Post[];
  startDate: string;
  endDate: string;
};

export type Post = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  content: string;
  pictures: Picture[];
  tripId: number;
};

export type Picture = {
  id: number;
  caption: string;
  imageUrl: string;
  postId: number;
};

export type User = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  about: string | null;
  title: string | null;
  token: string | null;
  trips: Trip[];
};

export type DefaultMarker = { lat: number; lng: number };
