export type Trip = {
  id: number;
  tripTitle: string;
  posts: Post[];
  startDate: string;
  endDate: string;
  userId: number;
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

export type NoTokenUser = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  about: string | null;
  title: string | null;
  trips: Trip[];
};

export type DefaultMarker = { lat: number; lng: number };

export type Credentials = {
  email: string;
  password: string;
};

export type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  title: string;
  about: string;
};

export type TripDetails = {
  tripTitle: string;
  startDate: string;
  endDate: string;
};

export type NewPicture = { imageUrl: string };

export type NewPost = {
  latitude: number;
  longitude: number;
  title: string;
  content: string;
  pictures: NewPicture[];
  tripId: number;
};
