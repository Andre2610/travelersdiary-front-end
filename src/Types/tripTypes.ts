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

export type TripDetails = {
  tripTitle: string;
  startDate: string;
  endDate: string;
};

export type NewPicture = string[];

export type NewPost = {
  latitude: number;
  longitude: number;
  title: string;
  content: string;
  pictures: NewPicture[];
  tripId: number;
};

export type DefaultMarker = {
  lat: number;
  lng: number;
  address: string;
  flag: string;
};
