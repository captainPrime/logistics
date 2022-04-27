import axios from "axios";

const PROVIDUS_BASE_URL = "https://vps.providusbank.com/vps/api";
//const RAVE_PAY_BASE_URL = "https://api.ravepay.co";
//https://vps.providusbank.com/vps/api/

//http://154.113.16.142:8088/appdevapi/api

const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  "Client-Id": "VzNWZTVUMSFfUHIwKCkxMjE=",
  "X-Auth-Signature": `${process.env.PROVIDUS_X_AUTH_SIGNATURE}`,
};
export const providusClient = axios.create({
  baseURL: `${PROVIDUS_BASE_URL}`,
  headers,
});
