require("dotenv").config();
export const apiUrl = process.env.API_URL || "http://localhost:5000";
export const googleAPIkey = process.env.GOOGLE_MAPS_API_KEY;
