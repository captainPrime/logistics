//https://wevesti.com/wp-json/posts

//https://css-tricks.com/using-the-wp-api-to-fetch-posts/
import axios from "axios";

const RELOADLY_BASE_URL = "https://topups.reloadly.com";


export const WpClient = axios.create({
  baseURL: RELOADLY_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// export const polygonV1Client = axios.create({
//   baseURL: POLYGON_WAVE_BASE_V1_URL,
//   headers: {
//     Accept: "application/json, text/plain, */*",
//     "Content-Type": "application/json",
//   },
// });

const addTokenToRequest = (request) => {
  request.params = {
    ...request.params,
    apiKey: process.env.POLYGON_API_KEY,
  };
  return request;
};

WpClient.interceptors.request.use(addTokenToRequest);
//polygonV1Client.interceptors.request.use(addTokenToRequest);

export default WpClient;
