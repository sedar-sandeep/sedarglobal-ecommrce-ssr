import axios from "axios";
// import GLOBALS from '../Globals';
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/x-www-form-urlencoded;multipart/form-data; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'X-Requested-With',
    "Access-Control-Allow-Methods": "GET, POST, PUT",
    "Accept": "multipart/form-data",

  }
});

