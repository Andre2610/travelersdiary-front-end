import { Trip } from "./tripTypes";

export type User = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  about: string | null;
  title: string | null;
  token: string | null;
  trips: Trip[];
  verified: boolean;
};

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
