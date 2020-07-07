import { allTripsFetched } from "../Store/trips/actions";

require("dotenv").config();
export const apiUrl = process.env.API_URL || "http://localhost:5000";
export const googleAPIkey = "AIzaSyCHyLdIPlfoLbZCd6AYkX4DM7JPpR97yA0";
export const cloudinaryUrl =
  "https://api.cloudinary.com/v1_1/dui8yvobq/image/upload";

export const cloud_name = "dui8yvobq";
export const upload_preset = "cloudinaryapi";
