import axios from "axios";
import { API } from "./apis";

export const registerUser = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => API.post("/auth/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}) => API.post("/auth/login", data);

export const verifyOtp = (data: {
  user_id: number;
  otp: string;
}) => API.post("/auth/verify-otp", data);

  
export const loginOwner = (data: { email: string; password: string }) =>
  axios.post("/api/car-register/auth/login", data);
